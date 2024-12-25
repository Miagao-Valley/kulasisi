from rest_framework import serializers

from .models import DictEntry
from users.models import User
from languages.models import Language


class DictEntrySerializer(serializers.ModelSerializer):
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
        model = DictEntry
        fields = [
            "id",
            "word",
            "definition",
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
            "translation_count": {"read_only": True},
        }

    def get_vote_count(self, obj):
        return obj.votes.filter(value=1).count() - obj.votes.filter(value=-1).count()

    def get_contributor_reputation(self, obj):
        return obj.contributor.get_reputation()

    def update(self, instance, validated_data):
        validated_data.pop("lang", None)
        validated_data.pop("word", None)
        return super().update(instance, validated_data)


class DictEntryHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = DictEntry.history.model
        fields = ["history_id", "word", "definition", "history_user", "history_date"]