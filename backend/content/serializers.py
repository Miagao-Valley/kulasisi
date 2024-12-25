from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404
from rest_framework import serializers

from .models import Language, LanguageProficiency, PhraseEntry, DictEntry, Translation, Vote
from users.models import User


class LanguageSerializer(serializers.ModelSerializer):
    user_count = serializers.SerializerMethodField()
    phrase_entry_count = serializers.SerializerMethodField()
    translation_count = serializers.SerializerMethodField()
    users_by_proficiency = serializers.SerializerMethodField()

    class Meta:
        model = Language
        fields = ["id", "code", "name", "user_count", "users_by_proficiency", "translation_count", "phrase_entry_count"]

    def get_user_count(self, obj):
        return obj.proficiencies.count()

    def get_phrase_entry_count(self, obj):
        return obj.phrase_entries.count()

    def get_translation_count(self, obj):
        return obj.translations.count()

    def get_users_by_proficiency(self, obj):
        users_by_level = {}
        for level in [1, 2, 3, 4, 5]:
            users_by_level[level] = obj.proficiencies.filter(level=level).count()

        return users_by_level


class LanguageProficiencySerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )

    class Meta:
        model = LanguageProficiency
        fields = ["lang", "level"]


class PhraseEntrySerializer(serializers.ModelSerializer):
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
        model = PhraseEntry
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


class PhraseEntryHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = PhraseEntry.history.model
        fields = ["history_id", "content", "history_user", "history_date"]


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


class TranslationSerializer(serializers.ModelSerializer):
    phrase_entry = serializers.PrimaryKeyRelatedField(
        queryset=PhraseEntry.objects.all(), required=False
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

        if "phrase_entry_pk" in view_kwargs:
            target_model = PhraseEntry
            object_id = view_kwargs["phrase_entry_pk"]
        elif "dict_entry_pk" in view_kwargs:
            target_model = DictEntry
            object_id = view_kwargs["dict_entry_pk"]
        elif "translation_pk" in view_kwargs:
            target_model = Translation
            object_id = view_kwargs["translation_pk"]
        else:
            raise serializers.ValidationError("Invalid target for voting.")

        target_object = get_object_or_404(target_model, id=object_id)

        vote, created = Vote.objects.get_or_create(
            user=user,
            content_type=ContentType.objects.get_for_model(target_model),
            object_id=target_object.id,
            defaults={"value": value},
        )

        if not created:
            vote.value = value
            vote.save()

        return vote
