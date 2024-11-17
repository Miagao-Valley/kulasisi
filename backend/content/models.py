from django.db import models
from django.contrib.auth import get_user_model
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
    lang = models.ForeignKey(Language, on_delete=models.CASCADE)
    level = models.PositiveSmallIntegerField(choices=PROFICIENCY_CHOICES)

    class Meta:
        unique_together = ("user", "lang")

    def __str__(self):
        return f"{self.user.username} - {self.lang.code} ({self.get_proficiency_level_name()})"

    def get_proficiency_level_name(self):
        return dict(self.PROFICIENCY_CHOICES).get(self.level, "Unknown")


class TextEntry(models.Model):
    content = models.TextField()
    lang = models.ForeignKey(
        Language, on_delete=models.PROTECT, related_name="text_entries"
    )
    author = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="text_entries"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("content", "lang")

    def __str__(self):
        return f"{self.content} ({self.lang.code})"


class Translation(models.Model):
    text_entry = models.ForeignKey(
        TextEntry, on_delete=models.CASCADE, related_name="translations"
    )
    content = models.TextField()
    lang = models.ForeignKey(
        Language, on_delete=models.PROTECT, related_name="translations"
    )
    author = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="translations"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("content", "lang", "text_entry")

    def __str__(self):
        return f"{self.content} ({self.lang.code})"


class Vote(models.Model):
    VOTE_CHOICES = [(1, "Upvote"), (-1, "Downvote"), (0, "Unvote")]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="votes")
    text_entry = models.ForeignKey(
        TextEntry, on_delete=models.CASCADE, related_name="votes", null=True, blank=True
    )
    translation = models.ForeignKey(
        Translation,
        on_delete=models.CASCADE,
        related_name="votes",
        null=True,
        blank=True,
    )
    value = models.SmallIntegerField(choices=VOTE_CHOICES)
    voted_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "text_entry"],
                name="unique_textentry_vote",
                condition=models.Q(text_entry__isnull=False),
            ),
            models.UniqueConstraint(
                fields=["user", "translation"],
                name="unique_translation_vote",
                condition=models.Q(translation__isnull=False),
            ),
        ]

    def clean(self):
        if not self.text_entry and not self.translation:
            raise ValidationError(
                "A vote must be assigned to either a text entry or a translation."
            )
        if self.text_entry and self.translation:
            raise ValidationError(
                "A vote cannot be assigned to both a text entry and a translation."
            )

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        if self.text_entry:
            return f"Vote by {self.user.username} on Text Entry {self.text_entry.pk}"
        elif self.translation:
            return f"Vote by {self.user.username} on Translation {self.translation.pk}"
