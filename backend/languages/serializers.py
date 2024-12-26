from rest_framework import serializers

from .models import Language, LanguageProficiency


class LanguageSerializer(serializers.ModelSerializer):
    user_count = serializers.SerializerMethodField()
    phrase_entry_count = serializers.SerializerMethodField()
    translation_count = serializers.SerializerMethodField()
    users_by_proficiency = serializers.SerializerMethodField()

    class Meta:
        model = Language
        fields = [
            "id",
            "code",
            "name",
            "user_count",
            "users_by_proficiency",
            "translation_count",
            "phrase_entry_count",
        ]

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
