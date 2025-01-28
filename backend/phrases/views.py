import asyncio
from urllib.parse import quote
from django.shortcuts import get_object_or_404
from django.db.models import Count, Sum, Case, When, Value, IntegerField
from django.db.models.functions import Coalesce
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from googletrans import Translator


from .models import Phrase, Translation, Category
from .serializers import (
    PhraseSerializer,
    PhraseHistorySerializer,
    TranslationSerializer,
    TranslationHistorySerializer,
    CategorySerializer,
    GoogleTranslateSerializer,
)
from .constants import ISO639_3_to_GoogleTranslate


class ListCreatePhraseView(generics.ListCreateAPIView):
    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["lang__code", "contributor__username", "categories__name"]
    search_fields = ["content"]
    ordering_fields = [
        "content",
        "vote_count",
        "translation_count",
        "updated_at",
        "created_at",
    ]
    ordering = ["-updated_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.annotate(
            vote_count=Coalesce(
                Sum(
                    Case(
                        When(votes__value=1, then=Value(1)),
                        When(votes__value=-1, then=Value(-1)),
                        When(votes__value=0, then=Value(0)),
                        default=Value(0),
                        output_field=IntegerField(),
                    )
                ),
                Value(0),
            ),
            translation_count=Count("translations"),
        )
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(contributor=self.request.user)
        else:
            print(serializer.errors)


class RetrieveUpdateDestroyPhraseView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "phrase_pk"


class ListPhraseHistoryView(generics.ListAPIView):
    serializer_class = PhraseHistorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        phrase = get_object_or_404(Phrase, id=self.kwargs.get("phrase_pk"))
        return phrase.history.all()


class ListCreateTranslationsView(generics.ListCreateAPIView):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["phrase", "lang__code", "contributor__username"]
    search_fields = ["content"]
    ordering_fields = ["content", "vote_count", "updated_at", "created_at"]
    ordering = ["-updated_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.annotate(
            vote_count=Coalesce(
                Sum(
                    Case(
                        When(votes__value=1, then=Value(1)),
                        When(votes__value=-1, then=Value(-1)),
                        When(votes__value=0, then=Value(0)),
                        default=Value(0),
                        output_field=IntegerField(),
                    )
                ),
                Value(0),
            ),
        )
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            phrase = get_object_or_404(Phrase, id=self.request.data.get("phrase"))
            serializer.save(phrase=phrase, contributor=self.request.user)
        else:
            print(serializer.errors)


class RetrieveUpdateDestroyTranslationsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "translation_pk"


class ListTranslationHistoryView(generics.ListAPIView):
    serializer_class = TranslationHistorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        translation = get_object_or_404(
            Translation, id=self.kwargs.get("translation_pk")
        )
        return translation.history.all()


class ListCreateCategoryView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["name", "description"]
    ordering_fields = ["name"]
    ordering = ["name"]
    pagination_class = None


class RetrieveUpdateDestroyCategoryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "name"


class GoogleTranslateView(generics.GenericAPIView):
    serializer_class = GoogleTranslateSerializer

    async def translate_text(self, text, source, target):
        """Helper method to handle the async translation."""
        async with Translator() as translator:
            result = await translator.translate(text, src=source, dest=target)
            return result.text

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        validated_data = serializer.validated_data
        text = validated_data["text"]
        source = ISO639_3_to_GoogleTranslate[validated_data["source"]]
        target = ISO639_3_to_GoogleTranslate[validated_data["target"]]

        try:
            translated_text = asyncio.run(self.translate_text(text, source, target))
        except Exception as e:
            return Response(
                {"detail": f"An error occurred during translation: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        encoded_text = quote(text)
        google_translate_url = f"https://translate.google.com/?sl={source}&tl={target}&text={encoded_text}"

        return Response(
            {
                "text": text,
                "translated": translated_text,
                "google_translate_url": google_translate_url,
            },
            status=status.HTTP_200_OK,
        )