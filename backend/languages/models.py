from django.db import models
from django.contrib.auth import get_user_model
from users.models import User

User = get_user_model()


class Language(models.Model):
    """
    Represents a language that users can have proficiency in.
    """

    code = models.CharField(
        max_length=3,
        unique=True,
        help_text="The unique code for the language (e.g., 'eng' for English).",
    )
    name = models.CharField(
        max_length=32, help_text="The full name of the language (e.g., 'English')."
    )

    class Meta:
        unique_together = ("code", "name")
        verbose_name = "Language"
        verbose_name_plural = "Languages"

    def __str__(self):
        return f"{self.name} ({self.code})"


class LanguageProficiency(models.Model):
    """
    Represents a user's proficiency level in a specific language.
    """

    PROFICIENCY_CHOICES = [
        (1, "Elementary Proficiency"),
        (2, "Limited Working Proficiency"),
        (3, "Professional Working Proficiency"),
        (4, "Full Professional Proficiency"),
        (5, "Native / Bilingual Proficiency"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="language_proficiencies",
        help_text="The user who has this proficiency level in a language.",
    )
    lang = models.ForeignKey(
        Language,
        on_delete=models.CASCADE,
        related_name="proficiencies",
        help_text="The language in which the user has proficiency.",
    )
    level = models.PositiveSmallIntegerField(
        choices=PROFICIENCY_CHOICES,
        help_text="The proficiency level of the user in this language.",
    )

    class Meta:
        unique_together = ("user", "lang")
        verbose_name = "Language Proficiency"
        verbose_name_plural = "Language Proficiencies"

    def __str__(self):
        return f"{self.user.username} - {self.lang.code} ({self.get_proficiency_level_name()})"

    def get_proficiency_level_name(self):
        """Returns the name of the proficiency level based on the integer value."""
        return dict(self.PROFICIENCY_CHOICES).get(self.level, "Unknown")
