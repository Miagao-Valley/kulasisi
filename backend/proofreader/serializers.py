from rest_framework import serializers
from .proofreader import SUPPORTED_LANGUAGES
from languages.models import Language


class FlaggedTokenSerializer(serializers.Serializer):
    offset = serializers.IntegerField(help_text="The offset of the token in the text.")
    token = serializers.CharField(help_text="The flagged token.")
    rule_id = serializers.CharField(help_text="The ID for the rule broken.")
    message = serializers.CharField(
        help_text="The message corresponding to the rule broken."
    )
    level = serializers.ChoiceField(
        help_text="The level of the rule broken.", choices=("error", "warning", "info")
    )
    suggestions = serializers.ListField(
        child=serializers.CharField(),
        help_text="List of suggestions for the flagged token.",
    )


class StatsSerializer(serializers.Serializer):
    token_count = serializers.IntegerField(help_text="Total token count in the text.")
    flagged_count = serializers.IntegerField(help_text="Number of flagged tokens.")
    correctness = serializers.FloatField(
        help_text="A score representing the correctness of the text."
    )


class ProofreaderSerializer(serializers.Serializer):
    text = serializers.CharField(
        required=True, write_only=True, help_text="Text to be proofread."
    )
    lang = serializers.ChoiceField(
        choices=SUPPORTED_LANGUAGES,
        required=True,
        write_only=True,
        help_text="The language of the text.",
    )
    flagged_tokens = FlaggedTokenSerializer(
        many=True, read_only=True, help_text="The flagged tokens."
    )
    stats = StatsSerializer(
        read_only=True,
        help_text="Statistics for token count, flagged count, and correctness.",
    )


class ProofreaderLanguagesSerializer(serializers.Serializer):

    class Meta:
        model = Language
        fields = ["code"]
