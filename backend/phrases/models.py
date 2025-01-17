from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from simple_history.models import HistoricalRecords
from core.models import Vote
from users.models import User
from languages.models import Language

User = get_user_model()


class Category(models.Model):
    name = models.CharField(max_length=64, unique=True)
    description = models.TextField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.name}"


class Phrase(models.Model):
    content = models.TextField()
    lang = models.ForeignKey(Language, on_delete=models.PROTECT, related_name="phrases")
    contributor = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="phrases"
    )
    categories = models.ManyToManyField(Category, related_name="phrases")
    votes = GenericRelation(Vote, related_query_name="phrase")
    usage_note = models.TextField(null=True, blank=True)
    source_title = models.CharField(max_length=255, null=True, blank=True)
    source_link = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("content", "lang")

    def __str__(self):
        return f"{self.content} ({self.lang.code})"


class Translation(models.Model):
    phrase = models.ForeignKey(
        Phrase, on_delete=models.CASCADE, related_name="translations"
    )
    content = models.TextField()
    lang = models.ForeignKey(
        Language, on_delete=models.PROTECT, related_name="translations"
    )
    contributor = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="translations"
    )
    votes = GenericRelation(Vote, related_query_name="translations")
    source_title = models.CharField(max_length=255, null=True, blank=True)
    source_link = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("content", "lang", "phrase")

    def __str__(self):
        return f"{self.content} ({self.lang.code})"
