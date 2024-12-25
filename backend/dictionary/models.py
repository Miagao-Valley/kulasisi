from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from core.models import Entry, Vote
from users.models import User
from languages.models import Language

User = get_user_model()

class DictEntry(Entry):
    lang = models.ForeignKey(Language, on_delete=models.PROTECT, related_name="dict_entries")
    contributor = models.ForeignKey(User, on_delete=models.PROTECT, related_name="dict_entries")
    votes = GenericRelation(Vote, related_query_name="dict_entry")

    word = models.CharField(max_length=64)
    definition = models.TextField(max_length=512)

    class Meta:
        unique_together = ("word", "lang")

    def __str__(self):
        return f"{self.word} ({self.lang.code})"