from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from django.core.exceptions import ValidationError
from simple_history.models import HistoricalRecords
from core.models import Vote
from users.models import User
from languages.models import Language

User = get_user_model()


class Category(models.Model):
    """
    Represents a category for organizing phrases.
    """

    name = models.CharField(
        max_length=64,
        unique=True,
        help_text="The name of the category.",
    )
    description = models.TextField(
        max_length=255,
        null=True,
        blank=True,
        help_text="A brief description of the category.",
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class Phrase(models.Model):
    """
    Represents a phrase in a particular language.
    """

    CATEGORY_LIMIT = 5
    TRUNCATE_LIMIT = 50

    content = models.TextField(max_length=10000, help_text="The phrase content.")
    lang = models.ForeignKey(
        Language,
        on_delete=models.PROTECT,
        related_name="phrases",
        help_text="The language this phrase belongs to.",
    )
    contributor = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="phrases",
        help_text="The user who contributed this phrase.",
    )
    categories = models.ManyToManyField(
        Category,
        related_name="phrases",
        help_text="Categories associated with this phrase.",
    )
    votes = GenericRelation(
        Vote,
        related_query_name="phrase",
        help_text="Votes associated with this phrase.",
    )
    usage_note = models.TextField(
        max_length=1000,
        null=True,
        blank=True,
        help_text="Additional notes on the usage of the phrase.",
    )
    source_title = models.CharField(
        max_length=255, null=True, blank=True, help_text="The title of the source."
    )
    source_link = models.URLField(
        null=True, blank=True, help_text="A link to the source of the phrase."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("content", "lang")
        verbose_name = "Phrase"
        verbose_name_plural = "Phrases"

    def clean(self):
        if self.categories.count() > self.CATEGORY_LIMIT:
            raise ValidationError(
                f"A phrase can have at most {self.CATEGORY_LIMIT} categories."
            )

    def __str__(self):
        return (
            f"{self.content[:self.TRUNCATE_LIMIT]}... ({self.lang.code})"
            if len(self.content) > self.TRUNCATE_LIMIT
            else f"{self.content} ({self.lang.code})"
        )


class Translation(models.Model):
    """
    Represents a translation of a phrase into a different language.
    """

    TRUNCATE_LIMIT = 50

    phrase = models.ForeignKey(
        Phrase,
        on_delete=models.CASCADE,
        related_name="translations",
        help_text="The phrase being translated.",
    )
    content = models.TextField(
        max_length=10000, help_text="The translated phrase content."
    )
    lang = models.ForeignKey(
        Language,
        on_delete=models.PROTECT,
        related_name="translations",
        help_text="The language of the translation.",
    )
    contributor = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="translations",
        help_text="The user who contributed this translation.",
    )
    votes = GenericRelation(
        Vote,
        related_query_name="translations",
        help_text="Votes associated with this translation.",
    )
    source_title = models.CharField(
        max_length=255, null=True, blank=True, help_text="The title of the source."
    )
    source_link = models.URLField(
        null=True, blank=True, help_text="A link to the source of the translation."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("content", "lang", "phrase")
        verbose_name = "Translation"
        verbose_name_plural = "Translations"

    def clean(self):
        if self.lang == self.phrase.lang:
            raise ValidationError(
                "The translation language must be different from the phrase language."
            )

    def __str__(self):
        return (
            f"{self.content[:self.TRUNCATE_LIMIT]}... ({self.lang.code})"
            if len(self.content) > self.TRUNCATE_LIMIT
            else f"{self.content} ({self.lang.code})"
        )
