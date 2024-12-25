from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from .models import Vote
from users.models import User
from phrases.models import PhraseEntry, Translation
from dictionary.models import DictEntry


class VoteSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    value = serializers.ChoiceField(choices=Vote.VOTE_CHOICES, required=True)

    class Meta:
        model = Vote
        fields = ["user", "value", "voted_at"]
        extra_kwargs = {
            "user": {"read_only": True},
        }

    def create(self, validated_data):
        user = self.context["request"].user
        value = validated_data.get("value")
        view_kwargs = self.context["view"].kwargs

        if "phrase_entry_pk" in view_kwargs:
            target_model = PhraseEntry
            object_id = view_kwargs["phrase_entry_pk"]
        elif "translation_pk" in view_kwargs:
            target_model = Translation
            object_id = view_kwargs["translation_pk"]
        elif "dict_entry_pk" in view_kwargs:
            target_model = DictEntry
            object_id = view_kwargs["dict_entry_pk"]
        else:
            raise serializers.ValidationError("Invalid target for voting.")

        target_object = get_object_or_404(target_model, id=object_id)

        vote, created = Vote.objects.get_or_create(
            user=user,
            content_type=ContentType.objects.get_for_model(target_model),
            object_id=target_object.id,
            defaults={"value": value},
        )

        if not created:
            vote.value = value
            vote.save()

        return vote
