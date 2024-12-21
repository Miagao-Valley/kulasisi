from django.shortcuts import get_object_or_404
from django.db.models import Count, Sum, Avg, Case, When, Value, IntegerField, FloatField
from django.db.models.functions import Coalesce
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import Language, TextEntry, Translation, Vote
from .serializers import (
    LanguageSerializer,
    TextEntrySerializer,
    TextEntryHistorySerializer,
    TranslationSerializer,
    TranslationHistorySerializer,
    VoteSerializer,
)


class ListLanguageView(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["code", "name"]
    ordering_fields = ["name", "user_count", "avg_proficiency", "text_entry_count", "translation_count"]
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
            text_entry_count=Count("text_entries"),
            translation_count=Count("translations"),
        )
        return queryset


class RetrieveLanguageView(generics.RetrieveAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    lookup_field = "code"


class ListCreateTextEntryView(generics.ListCreateAPIView):
    queryset = TextEntry.objects.all()
    serializer_class = TextEntrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["lang__code", "author__username"]
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
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class RetrieveUpdateDestroyTextEntryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TextEntry.objects.all()
    serializer_class = TextEntrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "text_entry_pk"


class ListTextEntryHistoryView(generics.ListAPIView):
    serializer_class = TextEntryHistorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        text_entry = get_object_or_404(TextEntry, id=self.kwargs.get("text_entry_pk"))
        return text_entry.history.all()


class ListCreateTranslationsView(generics.ListCreateAPIView):
    queryset = Translation.objects.all()
    serializer_class = TranslationSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["text_entry", "lang__code", "author__username"]
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
            text_entry = get_object_or_404(
                TextEntry, id=self.request.POST.get("text_entry")
            )
            serializer.save(text_entry=text_entry, author=self.request.user)
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

        if "text_entry_pk" in view_kwargs:
            target_model = TextEntry
            object_id = view_kwargs["text_entry_pk"]
        elif "translation_pk" in view_kwargs:
            target_model = Translation
            object_id = view_kwargs["translation_pk"]
        else:
            raise ValueError("Invalid target for votes.")

        target_object = get_object_or_404(target_model, id=object_id)
        return target_object.votes.all()
