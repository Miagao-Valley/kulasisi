from rest_framework import serializers

from .models import Language, LanguageProficiency


class LanguageSerializer(serializers.ModelSerializer):
    user_count = serializers.SerializerMethodField()
    phrase_count = serializers.SerializerMethodField()
    translation_count = serializers.SerializerMethodField()
    word_count = serializers.SerializerMethodField()
    definition_count = serializers.SerializerMethodField()
    users_by_proficiency = serializers.SerializerMethodField()

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

    def get_user_count(self, obj):
        return obj.proficiencies.count()

    def get_phrase_count(self, obj):
        return obj.phrases.count()

    def get_translation_count(self, obj):
        return obj.translations.count()

    def get_word_count(self, obj):
        return obj.words.count()

    def get_definition_count(self, obj):
        return obj.definitions.count()

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
