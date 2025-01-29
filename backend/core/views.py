from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from phrases.models import Phrase, Translation
from dictionary.models import Word, Definition
from languages.models import Language
from .serializers import VoteSerializer


class ListCreateVoteView(generics.ListCreateAPIView):
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        view_kwargs = self.kwargs
        target_object = self.get_target_object(view_kwargs)
        return target_object.votes.all()

    def get_target_object(self, view_kwargs):
        """Retrieves the target object (Phrase, Translation, Word, or Definition) based on the URL parameters."""
        if "phrase_pk" in view_kwargs:
            return get_object_or_404(Phrase, id=view_kwargs["phrase_pk"])
        elif "translation_pk" in view_kwargs:
            return get_object_or_404(Translation, id=view_kwargs["translation_pk"])
        elif "word" in view_kwargs and "lang" in view_kwargs:
            lang = get_object_or_404(Language, code=view_kwargs["lang"])
            return get_object_or_404(Word, lang=lang, word=view_kwargs["word"])
        elif "definition_pk" in view_kwargs:
            return get_object_or_404(Definition, id=view_kwargs["definition_pk"])
        else:
            raise ValueError("Invalid target for votes.")
