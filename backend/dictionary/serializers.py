from rest_framework import serializers

from .models import Word, Definition, PartOfSpeech
from users.models import User
from languages.models import Language


class PartOfSpeechSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartOfSpeech
        fields = [
            "abbr",
            "name",
            "description",
        ]

    def update(self, instance, validated_data):
        validated_data.pop("code", None)
        validated_data.pop("name", None)
        return super().update(instance, validated_data)


class WordSerializer(serializers.ModelSerializer):
    word = serializers.CharField(max_length=64, required=False)
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )
    contributor = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    contributor_reputation = serializers.SerializerMethodField()
    vote_count = serializers.SerializerMethodField()

    class Meta:
        model = Word
        fields = [
            "id",
            "word",
            "lang",
            "contributor",
            "contributor_reputation",
            "vote_count",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {
            "contributor": {"read_only": True},
            "vote_count": {"read_only": True},
        }

    def get_vote_count(self, obj):
        return obj.votes.filter(value=1).count() - obj.votes.filter(value=-1).count()

    def get_contributor_reputation(self, obj):
        return obj.contributor.get_reputation()

    def update(self, instance, validated_data):
        validated_data.pop("lang", None)
        return super().update(instance, validated_data)


class WordHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = Word.history.model
        fields = ["history_id", "word", "history_user", "history_date"]


class DefinitionSerializer(serializers.ModelSerializer):
    word = serializers.PrimaryKeyRelatedField(
        queryset=Word.objects.all(), required=False
    )
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )
    contributor = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    pos = serializers.SlugRelatedField(
        queryset=PartOfSpeech.objects.all(), slug_field="abbr", required=False
    )
    contributor_reputation = serializers.SerializerMethodField()
    vote_count = serializers.SerializerMethodField()

    class Meta:
        model = Definition
        fields = [
            "id",
            "word",
            "lang",
            "description",
            "contributor",
            "contributor_reputation",
            "pos",
            "usage_note",
            "source_title",
            "source_link",
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

    def update(self, instance, validated_data):
        validated_data.pop("lang", None)
        validated_data.pop("word", None)
        return super().update(instance, validated_data)


class DefinitionHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = Definition.history.model
        fields = ["history_id", "description", "history_user", "history_date"]
