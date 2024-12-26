from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from simple_history.models import HistoricalRecords
from core.models import Vote
from users.models import User
from languages.models import Language

User = get_user_model()


class DictEntry(models.Model):
    word = models.CharField(max_length=64)
    lang = models.ForeignKey(
        Language, on_delete=models.PROTECT, related_name="dict_entries"
    )
    contributor = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="dict_entries"
    )
    votes = GenericRelation(Vote, related_query_name="dict_entry")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("word", "lang")

    def __str__(self):
        return f"{self.word} ({self.lang.code})"


class Definition(models.Model):
    dict_entry = models.ForeignKey(
        DictEntry, on_delete=models.CASCADE, related_name="definitions"
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
        unique_together = ("dict_entry", "lang", "description")

    def __str__(self):
        return f"{self.description} ({self.dict_entry.word})"
