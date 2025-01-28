from django.db.models import Count, Q
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
    best_definitions = serializers.SerializerMethodField()
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
            "best_definitions",
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

    def get_contributor_reputation(self, obj: Word) -> int:
        return obj.contributor.get_reputation()

    def get_parts_of_speech(self, obj: Word) -> list[str]:
        return [
            definition.pos.abbr
            for definition in obj.definitions.all()
            if definition.pos
        ]

    def get_best_definition(self, obj: Word) -> str:
        definitions = obj.definitions.filter(lang=obj.lang)
        if not definitions:
            definitions = obj.definitions.filter(lang__code="eng")
        if not definitions:
            definitions = obj.definitions.all()

        best_definition = max(
            obj.definitions.all(),
            key=lambda definition: definition.votes.filter(value=1).count()
            - definition.votes.filter(value=-1).count(),
            default=None,
        )
        return best_definition.description if best_definition else ""

    def get_best_definitions(self, obj: Word) -> list[str]:
        definitions = obj.definitions.annotate(
            vote_count=Count("votes", filter=Q(votes__value=1)) - Count("votes", filter=Q(votes__value=-1))
        )

        best_definitions = {}
        langs = obj.definitions.values("lang").distinct()

        for l in langs:
            lang_id = l["lang"]

            try:
                lang = Language.objects.get(id=lang_id)
            except Language.DoesNotExist:
                continue

            best_definition = definitions.filter(lang=lang).order_by("-vote_count").first()

            if best_definition:
                best_definitions[lang.code] = best_definition.description

        return best_definitions

    def get_vote_count(self, obj: Word) -> int:
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
    word = WordSerializer(required=False, fields=["word", "lang"])
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

    def get_vote_count(self, obj: Definition) -> int:
        return obj.votes.filter(value=1).count() - obj.votes.filter(value=-1).count()

    def get_contributor_reputation(self, obj: Definition) -> int:
        return obj.contributor.get_reputation()

    def to_internal_value(self, data):
        lang_code = data.get("lang", self.instance.lang.code if self.instance else None)

        word_data = data.pop("word", None)

        synonyms = list(set(data.pop("synonyms", [])))
        antonyms = list(set(data.pop("antonyms", [])))

        overlapping_words = set(synonyms) & set(antonyms)
        if overlapping_words:
            raise ValueError(
                f"The following words cannot be both synonyms and antonyms: {', '.join(overlapping_words)}"
            )

        processed_data = super().to_internal_value(data)

        if word_data:
            word_object = get_object_or_404(
                Word, word=word_data["word"], lang__code=word_data["lang"]
            )
            processed_data["word"] = word_object

        synonym_objects = [
            get_object_or_404(Word, word=synonym, lang__code=lang_code)
            for synonym in synonyms
        ]
        antonym_objects = [
            get_object_or_404(Word, word=antonym, lang__code=lang_code)
            for antonym in antonyms
        ]

        processed_data["synonyms"] = synonym_objects
        processed_data["antonyms"] = antonym_objects

        return processed_data

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
