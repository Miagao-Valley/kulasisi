from collections import OrderedDict
from typing import TypedDict, Optional
from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
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
    word = serializers.CharField(
        max_length=64, required=False, help_text="The word being defined."
    )
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(),
        slug_field="code",
        required=False,
        help_text="The language code of the word.",
    )
    contributor = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field="username",
        required=False,
        help_text="The username of the contributor.",
    )
    contributor_reputation = serializers.SerializerMethodField(
        help_text="Reputation score of the contributor."
    )
    parts_of_speech = serializers.SerializerMethodField(
        help_text="Parts of speech for the word."
    )
    vote_count = serializers.SerializerMethodField(
        help_text="Number of upvotes minus downvotes."
    )
    user_vote = serializers.SerializerMethodField(
        help_text="The user's vote for the word."
    )
    best_definitions = serializers.SerializerMethodField(
        help_text="Best definitions based on votes in different languages."
    )
    definition_count = serializers.SerializerMethodField(
        help_text="Total number of definitions."
    )

    class Meta:
        model = Word
        fields = [
            "id",
            "word",
            "lang",
            "contributor",
            "contributor_reputation",
            "parts_of_speech",
            "source_title",
            "source_link",
            "created_at",
            "updated_at",
            "vote_count",
            "user_vote",
            "best_definitions",
            "definition_count",
        ]
        extra_kwargs = {
            "contributor": {"read_only": True},
            "vote_count": {"read_only": True},
            "user_vote": {"read_only": True},
        }

    def get_contributor_reputation(self, obj: Word) -> int:
        return obj.contributor.get_reputation()

    def get_parts_of_speech(self, obj: Word) -> list[str]:
        return [
            definition.pos.abbr
            for definition in obj.definitions.all()
            if definition.pos
        ]

    def get_vote_count(self, obj: Word) -> int:
        return obj.votes.filter(value=1).count() - obj.votes.filter(value=-1).count()

    def get_user_vote(self, obj: Word) -> int:
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return 0

        vote = obj.votes.filter(user=request.user).first()
        return vote.value if vote else 0

    def get_best_definitions(self, obj: Word) -> dict[str, str]:
        definitions = obj.definitions.annotate(
            vote_count=Count("votes", filter=Q(votes__value=1))
            - Count("votes", filter=Q(votes__value=-1))
        )

        best_definitions = []
        langs = obj.definitions.values("lang").distinct()

        for l in langs:
            lang_id = l["lang"]

            try:
                lang = Language.objects.get(id=lang_id)
            except Language.DoesNotExist:
                continue

            best_definition = (
                definitions.filter(lang=lang).order_by("-vote_count").first()
            )

            if best_definition:
                best_definitions.append(
                    (lang.code, best_definition.description, best_definition.vote_count)
                )

        best_definitions.sort(key=lambda x: x[2], reverse=True)

        return OrderedDict((lang, desc) for lang, desc, _ in best_definitions)

    def get_definition_count(self, obj: Word) -> int:
        return obj.definitions.count()

    def update(self, instance, validated_data):
        # Make 'word' and 'lang' fields immutable
        validated_data.pop("word", None)
        validated_data.pop("lang", None)
        return super().update(instance, validated_data)


class WordHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field="username",
        required=False,
        help_text="The username of the user who made the change.",
    )

    class Meta:
        model = Word.history.model
        fields = ["history_id", "word", "history_user", "history_date"]


class DefinitionSerializer(serializers.ModelSerializer):
    word = serializers.SerializerMethodField(
        required=False, help_text="The word being defined."
    )
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(),
        slug_field="code",
        required=False,
        help_text="The language of the definition.",
    )
    contributor = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field="username",
        required=False,
        help_text="The username of the contributor.",
    )
    contributor_reputation = serializers.SerializerMethodField(
        help_text="Reputation score of the contributor."
    )
    pos = serializers.SlugRelatedField(
        queryset=PartOfSpeech.objects.all(),
        slug_field="abbr",
        required=False,
        help_text="The part of speech for the definition.",
    )
    synonyms = serializers.SlugRelatedField(
        slug_field="word",
        many=True,
        required=False,
        read_only=True,
        help_text="Synonyms of the word.",
    )
    antonyms = serializers.SlugRelatedField(
        slug_field="word",
        many=True,
        required=False,
        read_only=True,
        help_text="Antonyms of the word.",
    )
    vote_count = serializers.SerializerMethodField(
        help_text="Number of upvotes minus downvotes."
    )
    user_vote = serializers.SerializerMethodField(
        help_text="The user's vote for the definition."
    )

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
            "user_vote",
        ]
        extra_kwargs = {
            "contributor": {"read_only": True},
            "vote_count": {"read_only": True},
            "user_vote": {"read_only": True},
        }

    class WordData(TypedDict):
        word: str
        lang: str

    def get_word(self, obj: Definition) -> Optional[WordData]:
        return {"word": obj.word.word, "lang": obj.word.lang.code} if obj.word else None

    def get_contributor_reputation(self, obj: Definition) -> int:
        return obj.contributor.get_reputation()

    def get_vote_count(self, obj: Definition) -> int:
        return obj.votes.filter(value=1).count() - obj.votes.filter(value=-1).count()

    def get_user_vote(self, obj: Definition) -> int:
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return 0

        vote = obj.votes.filter(user=request.user).first()
        return vote.value if vote else 0

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
        # Make 'lang' and 'word' fields immutable
        validated_data.pop("lang", None)
        validated_data.pop("word", None)
        return super().update(instance, validated_data)


class DefinitionHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field="username",
        required=False,
        help_text="The username of the user who made the change.",
    )

    class Meta:
        model = Definition.history.model
        fields = ["history_id", "description", "history_user", "history_date"]
