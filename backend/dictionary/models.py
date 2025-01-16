from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from simple_history.models import HistoricalRecords
from core.models import Vote
from users.models import User
from languages.models import Language

User = get_user_model()


class PartOfSpeech(models.Model):
    abbr = models.CharField(max_length=8, unique=True)
    name = models.CharField(max_length=64)
    description = models.TextField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.abbr})"


class Word(models.Model):
    word = models.CharField(max_length=64)
    lang = models.ForeignKey(Language, on_delete=models.PROTECT, related_name="words")
    contributor = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="words"
    )
    votes = GenericRelation(Vote, related_query_name="word")
    source_title = models.CharField(max_length=255, null=True, blank=True)
    source_link = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("word", "lang")

    def __str__(self):
        return f"{self.word} ({self.lang.code})"


class Definition(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name="definitions")
    lang = models.ForeignKey(
        Language, on_delete=models.PROTECT, related_name="definitions"
    )
    description = models.TextField(max_length=512)
    contributor = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="definitions"
    )
    pos = models.ForeignKey(
        PartOfSpeech,
        on_delete=models.PROTECT,
        related_name="definitions",
        null=True,
        blank=True,
    )
    votes = GenericRelation(Vote, related_query_name="definitions")
    usage_note = models.TextField(null=True, blank=True)
    source_title = models.CharField(max_length=255, null=True, blank=True)
    source_link = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("word", "lang", "description")

    def __str__(self):
        return f"{self.description} ({self.word.word})"
