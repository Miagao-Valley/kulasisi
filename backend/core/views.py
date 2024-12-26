from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from phrases.models import Phrase, Translation
from dictionary.models import Word, Definition
from .serializers import VoteSerializer


class ListCreateVoteView(generics.ListCreateAPIView):
    serializer_class = VoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None

    def get_queryset(self):
        view_kwargs = self.kwargs

        if "phrase_entry_pk" in view_kwargs:
            target_model = Phrase
            object_id = view_kwargs["phrase_entry_pk"]
        elif "translation_pk" in view_kwargs:
            target_model = Translation
            object_id = view_kwargs["translation_pk"]
        elif "dict_entry_pk" in view_kwargs:
            target_model = Word
            object_id = view_kwargs["dict_entry_pk"]
        elif "definition_pk" in view_kwargs:
            target_model = Definition
            object_id = view_kwargs["definition_pk"]
        else:
            raise ValueError("Invalid target for votes.")

        target_object = get_object_or_404(target_model, id=object_id)
        return target_object.votes.all()
