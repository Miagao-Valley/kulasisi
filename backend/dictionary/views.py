from django.shortcuts import get_object_or_404
from django.db.models import Sum, Case, When, Value, IntegerField
from django.db.models.functions import Coalesce
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import DictEntry, Definition
from .serializers import (
    DictEntrySerializer,
    DictEntryHistorySerializer,
    DefinitionSerializer,
    DefinitionHistorySerializer,
)


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


class ListCreateDefinitionView(generics.ListCreateAPIView):
    queryset = Definition.objects.all()
    serializer_class = DefinitionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["dict_entry", "contributor__username"]
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
            dict_entry = get_object_or_404(
                DictEntry, id=self.request.POST.get("dict_entry")
            )
            serializer.save(dict_entry=dict_entry, contributor=self.request.user)
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
        dict_entry = get_object_or_404(Definition, id=self.kwargs.get("definition_pk"))
        return dict_entry.history.all()
