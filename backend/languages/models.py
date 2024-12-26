from django.db import models
from django.contrib.auth import get_user_model
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
    lang = models.ForeignKey(
        Language, on_delete=models.CASCADE, related_name="proficiencies"
    )
    level = models.PositiveSmallIntegerField(choices=PROFICIENCY_CHOICES)

    class Meta:
        unique_together = ("user", "lang")

    def __str__(self):
        return f"{self.user.username} - {self.lang.code} ({self.get_proficiency_level_name()})"

    def get_proficiency_level_name(self):
        return dict(self.PROFICIENCY_CHOICES).get(self.level, "Unknown")
