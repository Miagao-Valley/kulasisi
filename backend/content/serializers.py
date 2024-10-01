from rest_framework import serializers

from .models import Language, TextEntry


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ["id", "code", "name"]


class TextEntrySerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )

    class Meta:
        model = TextEntry
        fields = ["id", "content", "lang", "created_at", "updated_at"]

    def update(self, instance, validated_data):
        validated_data.pop("lang", None)
        return super().update(instance, validated_data)
