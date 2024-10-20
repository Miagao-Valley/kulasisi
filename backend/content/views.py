from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Language, TextEntry
from .serializers import LanguageSerializer, TextEntrySerializer


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
    filterset_fields = ["lang__code"]
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
