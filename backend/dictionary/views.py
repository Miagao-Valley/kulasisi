from django.shortcuts import get_object_or_404
from django.db.models import Sum, Case, When, Value, IntegerField
from django.db.models.functions import Coalesce
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import Word, Definition, PartOfSpeech
from languages.models import Language
from .serializers import (
    WordSerializer,
    WordHistorySerializer,
    DefinitionSerializer,
    DefinitionHistorySerializer,
    PartOfSpeechSerializer,
)


class ListCreateWordView(generics.ListCreateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["lang__code", "contributor__username", "definitions__pos__abbr"]
    search_fields = ["word"]
    ordering_fields = ["word", "vote_count", "updated_at", "created_at"]
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
            serializer.save(contributor=self.request.user)
        else:
            print(serializer.errors)


class RetrieveUpdateDestroyWordView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "word"

    def get_object(self):
        lang = get_object_or_404(Language, code=self.kwargs.get("lang"))
        word = get_object_or_404(Word, lang=lang, word=self.kwargs.get("word"))
        return word


class ListWordHistoryView(generics.ListAPIView):
    serializer_class = WordHistorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        lang = get_object_or_404(Language, code=self.kwargs.get("lang"))
        word = get_object_or_404(Word, lang=lang, word=self.kwargs.get("word"))
        return word.history.all()


class ListCreateDefinitionView(generics.ListCreateAPIView):
    queryset = Definition.objects.all()
    serializer_class = DefinitionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = [
        "word__word",
        "word__lang__code",
        "lang__code",
        "contributor__username",
        "pos__abbr",
    ]
    search_fields = ["description"]
    ordering_fields = [
        "description",
        "vote_count",
        "pos__abbr",
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
        )
        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(
                contributor=self.request.user,
            )
        else:
            print(serializer.errors)


class RetrieveUpdateDestroyDefinitionView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Definition.objects.all()
    serializer_class = DefinitionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "definition_pk"


class ListDefinitionHistoryView(generics.ListAPIView):
    serializer_class = DefinitionHistorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        word = get_object_or_404(Definition, id=self.kwargs.get("definition_pk"))
        return word.history.all()


class ListCreatePartOfSpeechView(generics.ListCreateAPIView):
    queryset = PartOfSpeech.objects.all()
    serializer_class = PartOfSpeechSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ["abbr", "name", "description"]
    ordering_fields = ["abbr", "name"]
    ordering = ["name"]
    pagination_class = None


class RetrieveUpdateDestroyPartOfSpeechView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PartOfSpeech.objects.all()
    serializer_class = PartOfSpeechSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = "abbr"
