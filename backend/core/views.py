from drf_spectacular.utils import extend_schema, PolymorphicProxySerializer
from django.shortcuts import get_object_or_404
from django.db.models import Q, Value, Sum
from django.db.models.functions import Coalesce
from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from phrases.models import Phrase, Translation
from dictionary.models import Word, Definition
from languages.models import Language
from .serializers import VoteSerializer
from phrases.serializers import PhraseSerializer
from dictionary.serializers import WordSerializer
from core.pagination import CustomPagination
from utils.ranking import hot_score


@extend_schema(
    responses=PolymorphicProxySerializer(
        component_name="HomeFeed",
        serializers=[
            PhraseSerializer,
            WordSerializer,
        ],
        resource_type_field_name="entry_type",
    )
)
class HomeFeedView(GenericAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    # Override to prevent queryset requirement.
    queryset = Phrase.objects.none()

    def get(self, request):
        user = request.user

        # Build a proficiency lookup if the user is authenticated.
        user_lang_proficiencies = (
            {lang.lang.code: lang.level for lang in user.language_proficiencies.all()}
            if user.is_authenticated
            else {}
        )

        # Annotate phrases and words with vote sums and a content type.
        phrases = Phrase.objects.annotate(
            upvotes=Coalesce(Sum("votes__value", filter=Q(votes__value=1)), 0),
            downvotes=Coalesce(Sum("votes__value", filter=Q(votes__value=-1)), 0),
            content_type=Value("phrase"),
        ).values(
            "id", "content_type", "lang__code", "upvotes", "downvotes", "created_at"
        )

        words = Word.objects.annotate(
            upvotes=Coalesce(Sum("votes__value", filter=Q(votes__value=1)), 0),
            downvotes=Coalesce(Sum("votes__value", filter=Q(votes__value=-1)), 0),
            content_type=Value("word"),
        ).values(
            "id", "content_type", "lang__code", "upvotes", "downvotes", "created_at"
        )

        # Combine querysets and sort by hot score with a language boost.
        combined_queryset = list(phrases.union(words))

        def hot_sort_key(item):
            upvotes = item.get("upvotes") or 0
            downvotes = item.get("downvotes") or 0
            base_score = hot_score(upvotes, downvotes, item["created_at"])

            LANGUAGE_BOOST = 1.1
            boost = (
                LANGUAGE_BOOST + (user_lang_proficiencies[item["lang__code"]] / 10_000)
                if item["lang__code"] in user_lang_proficiencies
                else 1
            )

            return round(base_score * boost, 2)

        combined_queryset.sort(key=hot_sort_key, reverse=True)

        # Paginate the sorted results.
        paginator = CustomPagination()
        paginated_queryset = paginator.paginate_queryset(
            combined_queryset, request, view=self
        )

        # Bulk fetch model instances.
        phrase_ids = [
            item["id"]
            for item in paginated_queryset
            if item["content_type"] == "phrase"
        ]
        word_ids = [
            item["id"] for item in paginated_queryset if item["content_type"] == "word"
        ]

        phrases_dict = {p.id: p for p in Phrase.objects.filter(id__in=phrase_ids)}
        words_dict = {w.id: w for w in Word.objects.filter(id__in=word_ids)}

        # Serialize each item based on its content type.
        serialized_data = []
        for item in paginated_queryset:
            if item["content_type"] == "phrase":
                serializer = PhraseSerializer(
                    phrases_dict.get(item["id"]), context={"request": request}
                )
            elif item["content_type"] == "word":
                serializer = WordSerializer(
                    words_dict.get(item["id"]), context={"request": request}
                )
            serialized_data.append(serializer.data)

        return paginator.get_paginated_response(serialized_data)


class ListCreateVoteView(ListCreateAPIView):
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        view_kwargs = self.kwargs
        target_object = self.get_target_object(view_kwargs)
        return target_object.votes.all()

    def get_target_object(self, view_kwargs):
        """Retrieves the target object (Phrase, Translation, Word, or Definition) based on the URL parameters."""
        if "phrase_pk" in view_kwargs:
            return get_object_or_404(Phrase, id=view_kwargs["phrase_pk"])
        elif "translation_pk" in view_kwargs:
            return get_object_or_404(Translation, id=view_kwargs["translation_pk"])
        elif "word" in view_kwargs and "lang" in view_kwargs:
            lang = get_object_or_404(Language, code=view_kwargs["lang"])
            return get_object_or_404(Word, lang=lang, word=view_kwargs["word"])
        elif "definition_pk" in view_kwargs:
            return get_object_or_404(Definition, id=view_kwargs["definition_pk"])
        else:
            raise ValueError("Invalid target for votes.")
