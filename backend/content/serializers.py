from rest_framework import serializers

from .models import Language, TextEntry, Translation
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


class TextEntryHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = TextEntry.history.model
        fields = ["history_id", "content", "history_user", "history_date"]


class TranslationSerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )
    author = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = Translation
        fields = [
            "id",
            "text_entry",
            "content",
            "lang",
            "author",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {
            "author": {"read_only": True},
            "text_entry": {"read_only": True},
        }

    def validate(self, attrs):
        text_entry_id = self.context["request"].parser_context["kwargs"][
            "text_entry_pk"
        ]

        try:
            text_entry = TextEntry.objects.get(id=text_entry_id)
        except TextEntry.DoesNotExist:
            raise serializers.ValidationError(
                "The specified text entry does not exist."
            )

        if attrs.get("lang") == text_entry.lang:
            raise serializers.ValidationError(
                "The translation language must be different from the original text entry language."
            )

        return attrs

    def update(self, instance, validated_data):
        validated_data.pop("lang", None)
        return super().update(instance, validated_data)


class TranslationHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = Translation.history.model
        fields = ["history_id", "content", "history_user", "history_date"]
