from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from simple_history.models import HistoricalRecords
from core.models import Vote
from users.models import User
from languages.models import Language

User = get_user_model()


class PhraseEntry(models.Model):
    content = models.TextField()
    lang = models.ForeignKey(Language, on_delete=models.PROTECT, related_name="phrase_entries")
    contributor = models.ForeignKey(User, on_delete=models.PROTECT, related_name="phrase_entries")
    votes = GenericRelation(Vote, related_query_name="phrase_entry")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("content", "lang")

    def __str__(self):
        return f"{self.content} ({self.lang.code})"


class Translation(models.Model):
    phrase_entry = models.ForeignKey(PhraseEntry, on_delete=models.CASCADE, related_name="translations")
    content = models.TextField()
    lang = models.ForeignKey(Language, on_delete=models.PROTECT, related_name="translations")
    contributor = models.ForeignKey(User, on_delete=models.PROTECT, related_name="translations")
    votes = GenericRelation(Vote, related_query_name="translations")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("content", "lang", "phrase_entry")

    def __str__(self):
        return f"{self.content} ({self.lang.code})"