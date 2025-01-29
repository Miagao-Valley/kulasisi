from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from .models import Vote
from users.models import User
from phrases.models import Phrase, Translation
from dictionary.models import Word, Definition
from languages.models import Language


class DynamicFieldsSerializer(serializers.ModelSerializer):
    """
    A serializer that allows dynamic inclusion of fields.
    Only fields listed in the 'fields' argument will be included.
    """

    def __init__(self, *args, **kwargs):
        # Remove the 'fields' argument before passing it to the superclass
        fields = kwargs.pop("fields", None)

        # Initialize the superclass with the remaining arguments
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Only include the specified fields
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class VoteSerializer(serializers.ModelSerializer):
    """
    Serializer for handling vote actions on different content types (e.g., Phrase, Word).
    """

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
        """
        Create or update a vote for a specific content object (Phrase, Word, Definition, etc.).
        """
        user = self.context["request"].user
        value = validated_data.get("value")
        view_kwargs = self.context["view"].kwargs

        # Determine the target model and object ID based on the view parameters
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

        # Create or update the vote record
        vote, created = Vote.objects.get_or_create(
            user=user,
            content_type=ContentType.objects.get_for_model(target_model),
            object_id=object_id,
            defaults={"value": value},
        )

        if not created:
            # Update the vote value if it already exists
            vote.value = value
            vote.save()

        return vote
