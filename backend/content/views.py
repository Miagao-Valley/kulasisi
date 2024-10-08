from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Language, TextEntry
from .serializers import LanguageSerializer, TextEntrySerializer


class ListLanguageView(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class RetrieveLanguageView(generics.RetrieveAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    lookup_field = "code"


class ListCreateTextEntryView(generics.ListCreateAPIView):
    queryset = TextEntry.objects.all()
    serializer_class = TextEntrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class RetrieveUpdateDestroyTextEntryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TextEntry.objects.all()
    serializer_class = TextEntrySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
