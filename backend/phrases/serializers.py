from rest_framework import serializers

from .models import Phrase, Translation
from users.models import User
from languages.models import Language


class PhraseSerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )
    contributor = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    contributor_reputation = serializers.SerializerMethodField()
    vote_count = serializers.SerializerMethodField()
    translation_count = serializers.SerializerMethodField()

    class Meta:
        model = Phrase
        fields = [
            "id",
            "content",
            "lang",
            "contributor",
            "contributor_reputation",
            "created_at",
            "updated_at",
            "vote_count",
            "translation_count",
        ]
        extra_kwargs = {
            "contributor": {"read_only": True},
            "vote_count": {"read_only": True},
            "translation_count": {"read_only": True},
        }

    def get_vote_count(self, obj):
        return obj.votes.filter(value=1).count() - obj.votes.filter(value=-1).count()

    def get_translation_count(self, obj):
        return obj.translations.count()

    def get_contributor_reputation(self, obj):
        return obj.contributor.get_reputation()

    def update(self, instance, validated_data):
        validated_data.pop("lang", None)
        return super().update(instance, validated_data)


class PhraseHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = Phrase.history.model
        fields = ["history_id", "content", "history_user", "history_date"]


class TranslationSerializer(serializers.ModelSerializer):
    phrase_entry = serializers.PrimaryKeyRelatedField(
        queryset=Phrase.objects.all(), required=False
    )
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )
    contributor = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    contributor_reputation = serializers.SerializerMethodField()
    vote_count = serializers.SerializerMethodField()

    class Meta:
        model = Translation
        fields = [
            "id",
            "phrase_entry",
            "content",
            "lang",
            "contributor",
            "contributor_reputation",
            "created_at",
            "updated_at",
            "vote_count",
        ]
        extra_kwargs = {
            "contributor": {"read_only": True},
            "vote_count": {"read_only": True},
        }

    def get_vote_count(self, obj):
        return obj.votes.filter(value=1).count() - obj.votes.filter(value=-1).count()

    def get_contributor_reputation(self, obj):
        return obj.contributor.get_reputation()

    def validate(self, attrs):
        phrase_entry = attrs.get("phrase_entry")
        lang = attrs.get("lang")

        if phrase_entry and lang and lang == phrase_entry.lang:
            raise serializers.ValidationError(
                "The translation language must be different from the original phrase entry language."
            )

        return attrs

    def update(self, instance, validated_data):
        validated_data.pop("lang", None)
        validated_data.pop("phrase_entry", None)
        return super().update(instance, validated_data)


class TranslationHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = Translation.history.model
        fields = ["history_id", "content", "history_user", "history_date"]
