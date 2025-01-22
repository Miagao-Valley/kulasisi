from django.shortcuts import get_object_or_404
from rest_framework import serializers

from .models import Word, Definition, PartOfSpeech
from users.models import User
from languages.models import Language
from core.serializers import DynamicFieldsSerializer

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


class WordSerializer(DynamicFieldsSerializer):
    word = serializers.CharField(max_length=64, required=False)
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )
    contributor = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    contributor_reputation = serializers.SerializerMethodField()
    parts_of_speech = serializers.SerializerMethodField()
    best_definition = serializers.SerializerMethodField()
    vote_count = serializers.SerializerMethodField()

    class Meta:
        model = Word
        fields = [
            "id",
            "word",
            "lang",
            "contributor",
            "contributor_reputation",
            "parts_of_speech",
            "best_definition",
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

    def get_contributor_reputation(self, obj):
        return obj.contributor.get_reputation()

    def get_parts_of_speech(self, obj):
        return [definition.pos.abbr for definition in obj.definitions.all() if definition.pos]

    def get_best_definition(self, obj):
        definitions = obj.definitions.filter(lang=obj.lang)
        if not definitions:
            definitions = obj.definitions.filter(lang__code="eng")
        if not definitions:
            definitions = obj.definitions.all()

        best_definition = max(
            obj.definitions.all(),
            key=lambda definition: definition.votes.filter(value=1).count() - definition.votes.filter(value=-1).count(),
            default=None,
        )
        return best_definition.description if best_definition else ""

    def get_vote_count(self, obj):
        return obj.votes.filter(value=1).count() - obj.votes.filter(value=-1).count()

    def update(self, instance, validated_data):
        validated_data.pop("word", None)
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
    word = WordSerializer(
        required=False, fields=["word", "lang"]
    )
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(), slug_field="code", required=False
    )
    contributor = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )
    contributor_reputation = serializers.SerializerMethodField()
    pos = serializers.SlugRelatedField(
        queryset=PartOfSpeech.objects.all(), slug_field="abbr", required=False
    )
    synonyms = serializers.SlugRelatedField(
        slug_field="word", many=True, required=False, read_only=True
    )
    antonyms = serializers.SlugRelatedField(
        slug_field="word", many=True, required=False, read_only=True
    )
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
            "synonyms",
            "antonyms",
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

    def to_internal_value(self, data):
        lang_code = data.get("lang")
        if not lang_code and self.instance:
            lang_code = self.instance.lang.code

        synonyms = list(set(data.pop("synonyms", [])))
        antonyms = list(set(data.pop("antonyms", [])))

        overlapping_words = set(synonyms) & set(antonyms)
        if overlapping_words:
            raise ValueError(f"The following words cannot be both synonyms and antonyms: {', '.join(overlapping_words)}")

        processed_data = super().to_internal_value(data)

        synonym_objects = []
        antonym_objects = []
        for synonym in synonyms:
            synonym_instance = get_object_or_404(Word, word=synonym, lang__code=lang_code)
            synonym_objects.append(synonym_instance)
        for antonym in antonyms:
            antonym_instance = get_object_or_404(Word, word=antonym, lang__code=lang_code)
            antonym_objects.append(antonym_instance)

        processed_data["synonyms"] = synonym_objects
        processed_data["antonyms"] = antonym_objects

        return processed_data


    def update(self, instance, validated_data):
        validated_data.pop("lang", None)
        validated_data.pop("word", None)
        return super().update(instance, validated_data)


class CreateDefinitionSerializer(DefinitionSerializer):
    word = serializers.PrimaryKeyRelatedField(queryset=Word.objects.all())


class DefinitionHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(), slug_field="username", required=False
    )

    class Meta:
        model = Definition.history.model
        fields = ["history_id", "description", "history_user", "history_date"]
