from rest_framework import serializers

from .models import Language, TextEntry
from users.models import User


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ["id", "code", "name"]


class TextEntrySerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )
    author = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = TextEntry
        fields = ["id", "content", "lang", "author", "created_at", "updated_at"]
        extra_kwargs = {
            "author": {"read_only": True},
        }

    def update(self, instance, validated_data):
        validated_data.pop("lang", None)
        return super().update(instance, validated_data)
