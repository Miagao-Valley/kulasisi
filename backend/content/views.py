from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.decorators import action
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
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["code", "name"]
    ordering_fields = ["code", "name"]
    ordering = ["code"]


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
    ordering_fields = ["content", "created_at", "updated_at"]
    ordering = ["-updated_at"]

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
    ordering_fields = ["content", "created_at", "updated_at"]
    ordering = ["-updated_at"]

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
        if text_entry_pk := self.kwargs.get("text_entry_pk"):
            text_entry = get_object_or_404(TextEntry, id=text_entry_pk)
            return text_entry.votes.all()
        elif translation_pk := self.kwargs.get("translation_pk"):
            translation = get_object_or_404(Translation, id=translation_pk)
            return translation.votes.all()
