from django.shortcuts import get_object_or_404
from django.db.models import Sum, Case, When, Value, IntegerField
from django.db.models.functions import Coalesce
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import Word, Definition
from .serializers import (
    WordSerializer,
    WordHistorySerializer,
    DefinitionSerializer,
    DefinitionHistorySerializer,
)


class ListCreateWordView(generics.ListCreateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["lang__code", "contributor__username"]
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
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_url_kwarg = "word_pk"


class ListWordHistoryView(generics.ListAPIView):
    serializer_class = WordHistorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        word = get_object_or_404(Word, id=self.kwargs.get("word_pk"))
        return word.history.all()


class ListCreateDefinitionView(generics.ListCreateAPIView):
    queryset = Definition.objects.all()
    serializer_class = DefinitionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["word", "contributor__username"]
    search_fields = ["description"]
    ordering_fields = ["description", "vote_count", "updated_at", "created_at"]
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
            word = get_object_or_404(Word, id=self.request.POST.get("word"))
            serializer.save(word=word, contributor=self.request.user)
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
