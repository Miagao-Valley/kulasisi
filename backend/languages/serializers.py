from rest_framework import serializers

from .models import Language, LanguageProficiency


class LanguageSerializer(serializers.ModelSerializer):
    user_count = serializers.SerializerMethodField(
        help_text="Number of users proficient in this language."
    )
    phrase_count = serializers.SerializerMethodField(
        help_text="Number of phrases available in this language."
    )
    translation_count = serializers.SerializerMethodField(
        help_text="Number of translations in this language."
    )
    word_count = serializers.SerializerMethodField(
        help_text="Number of words in this language."
    )
    definition_count = serializers.SerializerMethodField(
        help_text="Number of definitions in this language."
    )
    users_by_proficiency = serializers.SerializerMethodField(
        help_text="Number of users at each proficiency level."
    )

    class Meta:
        model = Language
        fields = [
            "id",
            "code",
            "name",
            "user_count",
            "phrase_count",
            "translation_count",
            "word_count",
            "definition_count",
            "users_by_proficiency",
        ]

    def get_user_count(self, obj: Language) -> int:
        return obj.proficiencies.count()

    def get_phrase_count(self, obj: Language) -> int:
        return obj.phrases.count()

    def get_translation_count(self, obj: Language) -> int:
        return obj.translations.count()

    def get_word_count(self, obj: Language) -> int:
        return obj.words.count()

    def get_definition_count(self, obj: Language) -> int:
        return obj.definitions.count()

    def get_users_by_proficiency(self, obj: Language) -> dict[str, int]:
        users_by_level = {}
        for level in [1, 2, 3, 4, 5]:
            users_by_level[level] = obj.proficiencies.filter(level=level).count()

        return users_by_level


class LanguageProficiencySerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(),
        slug_field="code",
        required=False,
        help_text="The language for which the proficiency is recorded.",
    )

    class Meta:
        model = LanguageProficiency
        fields = ["lang", "level"]
        extra_kwargs = {
            "lang": {"required": False},
        }
