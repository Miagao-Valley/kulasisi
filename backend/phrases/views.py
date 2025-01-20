from django.shortcuts import get_object_or_404
from django.db.models import Count, Sum, Case, When, Value, IntegerField
from django.db.models.functions import Coalesce
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import Phrase, Translation, Category
from .serializers import (
    PhraseSerializer,
    PhraseHistorySerializer,
    TranslationSerializer,
    TranslationHistorySerializer,
    CategorySerializer,
)


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
