from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from .models import Vote
from users.models import User
from phrases.models import Phrase, Translation
from dictionary.models import Word, Definition
from languages.models import Language


class DynamicFieldsSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop("fields", None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


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

        if "phrase_pk" in view_kwargs:
            target_model = Phrase
            object_id = view_kwargs["phrase_pk"]
        elif "translation_pk" in view_kwargs:
            target_model = Translation
            object_id = view_kwargs["translation_pk"]
        elif "word" in view_kwargs and "lang" in view_kwargs:
            lang = get_object_or_404(Language, code=view_kwargs["lang"])
            word = get_object_or_404(Word, lang=lang, word=view_kwargs["word"])
            target_model = Word
            object_id = word.pk
        elif "definition_pk" in view_kwargs:
            target_model = Definition
            object_id = view_kwargs["definition_pk"]
        else:
            raise serializers.ValidationError("Invalid target for voting.")

        vote, created = Vote.objects.get_or_create(
            user=user,
            content_type=ContentType.objects.get_for_model(target_model),
            object_id=object_id,
            defaults={"value": value},
        )

        if not created:
            vote.value = value
            vote.save()

        return vote
