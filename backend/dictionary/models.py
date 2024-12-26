from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from simple_history.models import HistoricalRecords
from core.models import Vote
from users.models import User
from languages.models import Language

User = get_user_model()


class Word(models.Model):
    word = models.CharField(max_length=64)
    lang = models.ForeignKey(
        Language, on_delete=models.PROTECT, related_name="words"
    )
    contributor = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="words"
    )
    votes = GenericRelation(Vote, related_query_name="word")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("word", "lang")

    def __str__(self):
        return f"{self.word} ({self.lang.code})"


class Definition(models.Model):
    word = models.ForeignKey(
        Word, on_delete=models.CASCADE, related_name="definitions"
    )
    lang = models.ForeignKey(
        Language, on_delete=models.PROTECT, related_name="definitions"
    )
    description = models.TextField(max_length=512)
    contributor = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="definitions"
    )
    votes = GenericRelation(Vote, related_query_name="definitions")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("word", "lang", "description")

    def __str__(self):
        return f"{self.description} ({self.word.word})"
