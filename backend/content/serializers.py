from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from .models import Language, LanguageProficiency, TextEntry, Translation, Vote
from users.models import User


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ["id", "code", "name"]


class LanguageProficiencySerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )

    class Meta:
        model = LanguageProficiency
        fields = ["lang", "level"]


class TextEntrySerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )
    author = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    upvotes = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()

    class Meta:
        model = TextEntry
        fields = [
            "id",
            "content",
            "lang",
            "author",
            "created_at",
            "updated_at",
            "upvotes",
            "downvotes",
        ]
        extra_kwargs = {
            "author": {"read_only": True},
        }

    def get_upvotes(self, obj):
        return obj.votes.filter(value=1).count()

    def get_downvotes(self, obj):
        return obj.votes.filter(value=-1).count()

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
    text_entry = serializers.PrimaryKeyRelatedField(
        queryset=TextEntry.objects.all(), required=False
    )
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )
    author = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    upvotes = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()

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
            "upvotes",
            "downvotes",
        ]
        extra_kwargs = {
            "author": {"read_only": True},
        }

    def get_upvotes(self, obj):
        return obj.votes.filter(value=1).count()

    def get_downvotes(self, obj):
        return obj.votes.filter(value=-1).count()

    def validate(self, attrs):
        text_entry = attrs.get("text_entry")
        lang = attrs.get("lang")

        if text_entry and lang and lang == text_entry.lang:
            raise serializers.ValidationError(
                "The translation language must be different from the original text entry language."
            )

        return attrs

    def update(self, instance, validated_data):
        validated_data.pop("lang", None)
        validated_data.pop("text_entry", None)
        return super().update(instance, validated_data)


class TranslationHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = Translation.history.model
        fields = ["history_id", "content", "history_user", "history_date"]


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

        if text_entry_pk := self.context.get("view").kwargs.get("text_entry_pk"):
            text_entry = get_object_or_404(TextEntry, id=text_entry_pk)
            vote, created = Vote.objects.get_or_create(
                user=user, text_entry=text_entry, defaults={"value": value}
            )

        elif translation_pk := self.context.get("view").kwargs.get("translation_pk"):
            translation = get_object_or_404(Translation, id=translation_pk)
            vote, created = Vote.objects.get_or_create(
                user=user, translation=translation, defaults={"value": value}
            )

        if not created:
            vote.value = value
            vote.save()

        return vote
