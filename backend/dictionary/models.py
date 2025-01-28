from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from django.core.validators import RegexValidator
from simple_history.models import HistoricalRecords
from core.models import Vote
from users.models import User
from languages.models import Language

User = get_user_model()

# Restrict words to letters, numbers, dashes, underscores, and spaces
word_validator = RegexValidator(
    regex=r"^[a-zA-Z0-9\-_ ]+$",
    message="Invalid word. Only alphanumeric characters, dashes, and underscores are allowed.",
)


class PartOfSpeech(models.Model):
    """
    Represents a part of speech (e.g., noun, verb, adj).
    """

    abbr = models.CharField(
        max_length=8,
        unique=True,
        help_text="Abbreviation for the part of speech (e.g., 'adj' for Adjective).",
    )
    name = models.CharField(
        max_length=64, help_text="Full name of the part of speech (e.g., 'Adjective')."
    )
    description = models.TextField(
        max_length=255,
        null=True,
        blank=True,
        help_text="A brief description of the part of speech.",
    )

    def __str__(self):
        return f"{self.name} ({self.abbr})"

    class Meta:
        verbose_name = "Part of Speech"
        verbose_name_plural = "Parts of Speech"


class Word(models.Model):
    """
    Represents a word in a particular language.
    """

    word = models.CharField(
        max_length=64,
        validators=[word_validator],
        help_text="The word itself, containing only alphanumeric characters, dashes, underscores, and spaces.",
    )
    lang = models.ForeignKey(
        Language,
        on_delete=models.PROTECT,
        related_name="words",
        help_text="The language of this word.",
    )
    contributor = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="words",
        help_text="The user who contributed this word.",
    )
    votes = GenericRelation(
        Vote, related_query_name="word", help_text="Votes associated with this word."
    )
    source_title = models.CharField(
        max_length=255, null=True, blank=True, help_text="The title of the source."
    )
    source_link = models.URLField(
        null=True, blank=True, help_text="A link to the source of the word."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("word", "lang")
        verbose_name = "Word"
        verbose_name_plural = "Words"

    def __str__(self):
        return f"{self.word} ({self.lang.code})"


class Definition(models.Model):
    """
    Represents a definition of a word.
    """

    TRUNCATE_LIMIT = 50

    word = models.ForeignKey(
        Word,
        on_delete=models.CASCADE,
        related_name="definitions",
        help_text="The word for which this definition applies.",
    )
    lang = models.ForeignKey(
        Language,
        on_delete=models.PROTECT,
        related_name="definitions",
        help_text="The language of this definition.",
    )
    description = models.TextField(
        max_length=512, help_text="The definition of the word."
    )
    contributor = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="definitions",
        help_text="The user who contributed this definition.",
    )
    pos = models.ForeignKey(
        PartOfSpeech,
        on_delete=models.PROTECT,
        related_name="definitions",
        null=True,
        blank=True,
        help_text="The part of speech for this definition (e.g., noun, verb).",
    )
    synonyms = models.ManyToManyField(
        Word,
        related_name="indirect_synonyms",
        blank=True,
        help_text="Synonyms for the word.",
    )
    antonyms = models.ManyToManyField(
        Word,
        related_name="indirect_antonyms",
        blank=True,
        help_text="Antonyms for the word.",
    )
    votes = GenericRelation(
        Vote,
        related_query_name="definitions",
        help_text="Votes associated with this definition.",
    )
    usage_note = models.TextField(
        null=True, blank=True, help_text="Additional notes on the usage of the word."
    )
    source_title = models.CharField(
        max_length=255, null=True, blank=True, help_text="The title of the source."
    )
    source_link = models.URLField(
        null=True, blank=True, help_text="A link to the source of the definition."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("word", "lang", "description")
        verbose_name = "Definition"
        verbose_name_plural = "Definitions"

    def __str__(self):
        return (
            f"{self.description[:self.TRUNCATE_LIMIT]}... ({self.word.word})"
            if len(self.description) > self.TRUNCATE_LIMIT
            else f"{self.description} ({self.word.word})"
        )
