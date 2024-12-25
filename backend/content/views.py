from django.shortcuts import get_object_or_404
from django.db.models import Count, Sum, Avg, Case, When, Value, IntegerField, FloatField
from django.db.models.functions import Coalesce
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import Language, PhraseEntry, DictEntry, Translation, Vote
from .serializers import (
    LanguageSerializer,
    PhraseEntrySerializer,
    PhraseEntryHistorySerializer,
    DictEntrySerializer,
    DictEntryHistorySerializer,
    TranslationSerializer,
    TranslationHistorySerializer,
    VoteSerializer,
)


class ListLanguageView(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["code", "name"]
    ordering_fields = ["name", "user_count", "avg_proficiency", "phrase_entry_count", "translation_count"]
    ordering = ["code"]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.annotate(
            user_count=Count("proficiencies"),
            avg_proficiency=Coalesce(Avg(Case(
                When(proficiencies__level=1, then=Value(1)),
                When(proficiencies__level=2, then=Value(2)),
                When(proficiencies__level=3, then=Value(3)),
                When(proficiencies__level=4, then=Value(4)),
                When(proficiencies__level=5, then=Value(5)),
                default=Value(0),
                output_field=IntegerField()
            )) , Value(0), output_field=FloatField()),
            phrase_entry_count=Count("phrase_entries"),
            translation_count=Count("translations"),
        )
        return queryset


class RetrieveLanguageView(generics.RetrieveAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    lookup_field = "code"


class ListCreatePhraseEntryView(generics.ListCreateAPIView):
    queryset = PhraseEntry.objects.all()
    serializer_class = PhraseEntrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["lang__code", "contributor__username"]
    search_fields = ["content"]
    ordering_fields = ["content", "vote_count", "translation_count", "updated_at", "created_at"]
    ordering = ["-updated_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.annotate(
            vote_count=Coalesce(Sum(Case(
                When(votes__value=1, then=Value(1)),
                When(votes__value=-1, then=Value(-1)),
                When(votes__value=0, then=Value(0)),
                default=Value(0),
                output_field=IntegerField()
            )), Value(0)),
            translation_count=Count("translations")
        )
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(contributor=self.request.user)
        else:
            print(serializer.errors)


class RetrieveUpdateDestroyPhraseEntryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PhraseEntry.objects.all()
    serializer_class = PhraseEntrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "phrase_entry_pk"


class ListPhraseEntryHistoryView(generics.ListAPIView):
    serializer_class = PhraseEntryHistorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        phrase_entry = get_object_or_404(PhraseEntry, id=self.kwargs.get("phrase_entry_pk"))
        return phrase_entry.history.all()


class ListCreateDictEntryView(generics.ListCreateAPIView):
    queryset = DictEntry.objects.all()
    serializer_class = DictEntrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["lang__code", "contributor__username"]
    search_fields = ["word"]
    ordering_fields = ["word", "vote_count", "updated_at", "created_at"]
    ordering = ["-updated_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.annotate(
            vote_count=Coalesce(Sum(Case(
                When(votes__value=1, then=Value(1)),
                When(votes__value=-1, then=Value(-1)),
                When(votes__value=0, then=Value(0)),
                default=Value(0),
                output_field=IntegerField()
            )), Value(0)),
        )
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(contributor=self.request.user)
        else:
            print(serializer.errors)


class RetrieveUpdateDestroyDictEntryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DictEntry.objects.all()
    serializer_class = DictEntrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "dict_entry_pk"


class ListDictEntryHistoryView(generics.ListAPIView):
    serializer_class = DictEntryHistorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        dict_entry = get_object_or_404(DictEntry, id=self.kwargs.get("dict_entry_pk"))
        return dict_entry.history.all()


class ListCreateTranslationsView(generics.ListCreateAPIView):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["phrase_entry", "lang__code", "contributor__username"]
    search_fields = ["content"]
    ordering_fields = ["content", "vote_count", "updated_at", "created_at"]
    ordering = ["-updated_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.annotate(
            vote_count=Coalesce(Sum(Case(
                When(votes__value=1, then=Value(1)),
                When(votes__value=-1, then=Value(-1)),
                When(votes__value=0, then=Value(0)),
                default=Value(0),
                output_field=IntegerField()
            )), Value(0)),
        )
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            phrase_entry = get_object_or_404(
                PhraseEntry, id=self.request.POST.get("phrase_entry")
            )
            serializer.save(phrase_entry=phrase_entry, contributor=self.request.user)
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


class ListCreateVoteView(generics.ListCreateAPIView):
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        view_kwargs = self.kwargs

        if "phrase_entry_pk" in view_kwargs:
            target_model = PhraseEntry
            object_id = view_kwargs["phrase_entry_pk"]
        elif "dict_entry_pk" in view_kwargs:
            target_model = DictEntry
            object_id = view_kwargs["dict_entry_pk"]
        elif "translation_pk" in view_kwargs:
            target_model = Translation
            object_id = view_kwargs["translation_pk"]
        else:
            raise ValueError("Invalid target for votes.")

        target_object = get_object_or_404(target_model, id=object_id)
        return target_object.votes.all()
