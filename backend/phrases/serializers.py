from django.db.models import Count, Q
from rest_framework import serializers
from .models import Phrase, Translation, Category
from users.models import User
from languages.models import Language
from .constants import ISO639_3_to_GoogleTranslate


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "description"]

    def update(self, instance, validated_data):
        # Make 'name' field immutable
        validated_data.pop("name", None)
        return super().update(instance, validated_data)


class PhraseSerializer(serializers.ModelSerializer):
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(),
        slug_field="code",
        required=False,
        help_text="The language code for the phrase.",
    )
    contributor = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field="username",
        required=False,
        help_text="The contributor's username.",
    )
    contributor_reputation = serializers.SerializerMethodField(
        help_text="Reputation score of the contributor."
    )
    categories = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        slug_field="name",
        many=True,
        required=False,
        help_text="Categories the phrase belongs to.",
    )
    best_translations = serializers.SerializerMethodField(
        help_text="Best translations based on votes in different languages.."
    )
    translation_count = serializers.SerializerMethodField(
        help_text="Total number of translations."
    )
    vote_count = serializers.SerializerMethodField(
        help_text="Number of upvotes minus downvotes."
    )

    class Meta:
        model = Phrase
        fields = [
            "id",
            "content",
            "lang",
            "contributor",
            "contributor_reputation",
            "categories",
            "usage_note",
            "source_title",
            "source_link",
            "created_at",
            "updated_at",
            "vote_count",
            "best_translations",
            "translation_count",
        ]
        extra_kwargs = {
            "contributor": {"read_only": True},
            "vote_count": {"read_only": True},
            "translation_count": {"read_only": True},
        }

    def get_vote_count(self, obj: Phrase) -> int:
        return obj.votes.filter(value=1).count() - obj.votes.filter(value=-1).count()

    def get_best_translations(self, obj: Phrase) -> dict[str, str]:
        translations = obj.translations.annotate(
            vote_count=Count("votes", filter=Q(votes__value=1))
            - Count("votes", filter=Q(votes__value=-1))
        )

        best_translations = {}
        langs = obj.translations.values("lang").distinct()

        for l in langs:
            lang_id = l["lang"]

            try:
                lang = Language.objects.get(id=lang_id)
            except Language.DoesNotExist:
                continue

            best_translation = (
                translations.filter(lang=lang).order_by("-vote_count").first()
            )

            if best_translation:
                best_translations[lang.code] = best_translation.content

        return best_translations

    def get_translation_count(self, obj: Phrase) -> int:
        return obj.translations.count()

    def get_contributor_reputation(self, obj: Phrase) -> int:
        return obj.contributor.get_reputation()

    def validate_categories(self, value):
        if len(value) > Phrase.CATEGORY_LIMIT:
            raise serializers.ValidationError(
                f"A phrase can have at most {Phrase.CATEGORY_LIMIT} categories."
            )
        return value

    def update(self, instance, validated_data):
        # Make 'lang' field immutable
        validated_data.pop("lang", None)
        return super().update(instance, validated_data)


class PhraseHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field="username",
        required=False,
        help_text="The username of the user who made the change.",
    )

    class Meta:
        model = Phrase.history.model
        fields = ["history_id", "content", "history_user", "history_date"]


class TranslationSerializer(serializers.ModelSerializer):
    phrase = serializers.PrimaryKeyRelatedField(
        queryset=Phrase.objects.all(),
        required=False,
        help_text="The phrase being translated.",
    )
    lang = serializers.SlugRelatedField(
        queryset=Language.objects.all(),
        slug_field="code",
        required=False,
        help_text="The language of the translation.",
    )
    contributor = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field="username",
        required=False,
        help_text="The contributor's username.",
    )
    contributor_reputation = serializers.SerializerMethodField(
        help_text="Reputation score of the contributor."
    )
    vote_count = serializers.SerializerMethodField(
        help_text="Number of upvotes minus downvotes."
    )

    class Meta:
        model = Translation
        fields = [
            "id",
            "phrase",
            "content",
            "lang",
            "contributor",
            "contributor_reputation",
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

    def get_vote_count(self, obj: Translation) -> int:
        return obj.votes.filter(value=1).count() - obj.votes.filter(value=-1).count()

    def get_contributor_reputation(self, obj: Translation) -> int:
        return obj.contributor.get_reputation()

    def validate(self, attrs):
        phrase = attrs.get("phrase")
        lang = attrs.get("lang")

        if phrase and lang and lang == phrase.lang:
            raise serializers.ValidationError(
                "The translation language must be different from the phrase language."
            )

        return attrs

    def update(self, instance, validated_data):
        # Make 'lang' and 'phrase' fields immutable
        validated_data.pop("lang", None)
        validated_data.pop("phrase", None)
        return super().update(instance, validated_data)


class TranslationHistorySerializer(serializers.ModelSerializer):
    history_user = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        slug_field="username",
        required=False,
        help_text="The username of the user who made the change.",
    )

    class Meta:
        model = Translation.history.model
        fields = ["history_id", "content", "history_user", "history_date"]


class GoogleTranslateSerializer(serializers.Serializer):
    """
    Serializer for Google Translate integration.
    """

    text = serializers.CharField(required=True, help_text="Text to be translated.")
    source = serializers.ChoiceField(
        choices=list(ISO639_3_to_GoogleTranslate.keys()),
        default="auto",
        write_only=True,
        help_text="The language of the input text.",
    )
    target = serializers.ChoiceField(
        choices=list(ISO639_3_to_GoogleTranslate.keys()),
        default="eng",
        write_only=True,
        help_text="The language to translate the text into.",
    )
    original = serializers.CharField(
        read_only=True, help_text="The original text input."
    )
    translated = serializers.CharField(
        read_only=True, help_text="The translated text output."
    )
    google_translate_url = serializers.URLField(
        read_only=True,
        help_text="URL of the Google Translate service for this translation.",
    )
