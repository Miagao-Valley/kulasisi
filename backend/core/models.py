from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from simple_history.models import HistoricalRecords
from users.models import User
from languages.models import Language

User = get_user_model()

class Entry(models.Model):
    lang = models.ForeignKey(Language, on_delete=models.PROTECT)
    contributor = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords(inherit=True)

    class Meta:
        abstract = True


class Vote(models.Model):
    VOTE_CHOICES = [(1, "Upvote"), (-1, "Downvote"), (0, "Unvote")]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="votes")
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey("content_type", "object_id")
    value = models.SmallIntegerField(choices=VOTE_CHOICES)
    voted_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.value not in [-1, 0, 1]:
            raise ValidationError("Vote value must be -1, 0, or 1.")

    def __str__(self):
        return f"Vote by {self.user.username} on {self.content_object}"