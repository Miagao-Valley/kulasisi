from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from simple_history.models import HistoricalRecords
from users.models import User

User = get_user_model()


class Language(models.Model):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=32)

    class Meta:
        unique_together = ("code", "name")

    def __str__(self):
        return f"{self.name} ({self.code})"


class LanguageProficiency(models.Model):
    PROFICIENCY_CHOICES = [
        (1, "Elementary Proficiency"),
        (2, "Limited Working Proficiency"),
        (3, "Professional Working Proficiency"),
        (4, "Full Professional Proficiency"),
        (5, "Native / Bilingual Proficiency"),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="language_proficiencies"
    )
    lang = models.ForeignKey(Language, on_delete=models.CASCADE, related_name="proficiencies")
    level = models.PositiveSmallIntegerField(choices=PROFICIENCY_CHOICES)

    class Meta:
        unique_together = ("user", "lang")

    def __str__(self):
        return f"{self.user.username} - {self.lang.code} ({self.get_proficiency_level_name()})"

    def get_proficiency_level_name(self):
        return dict(self.PROFICIENCY_CHOICES).get(self.level, "Unknown")


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


class TextEntry(Entry):
    lang = models.ForeignKey(Language, on_delete=models.PROTECT, related_name="text_entries")
    contributor = models.ForeignKey(User, on_delete=models.PROTECT, related_name="text_entries")
    votes = GenericRelation(Vote, related_query_name="text_entry")

    content = models.TextField()

    class Meta:
        unique_together = ("content", "lang")

    def __str__(self):
        return f"{self.content} ({self.lang.code})"


class Translation(Entry):
    lang = models.ForeignKey(Language, on_delete=models.PROTECT, related_name="translations")
    contributor = models.ForeignKey(User, on_delete=models.PROTECT, related_name="translations")
    votes = GenericRelation(Vote, related_query_name="text_entries")

    text_entry = models.ForeignKey(
        TextEntry, on_delete=models.CASCADE, related_name="translations"
    )
    content = models.TextField()

    class Meta:
        unique_together = ("content", "lang", "text_entry")

    def __str__(self):
        return f"{self.content} ({self.lang.code})"