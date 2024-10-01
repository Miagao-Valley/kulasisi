from rest_framework import generics

from .models import Language
from .serializers import LanguageSerializer


class ListLanguageView(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer


class RetrieveLanguageView(generics.RetrieveAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    lookup_field = "code"
