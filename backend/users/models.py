from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    Custom user model that includes additional fields for profile and reputation system.
    """

    email = models.EmailField(
        unique=True, blank=False, null=False, help_text="The user's email address."
    )
    phone_number = models.CharField(
        max_length=15, blank=True, null=True, help_text="The user's phone number."
    )
    first_name = models.CharField(
        max_length=30, blank=True, null=True, help_text="The user's first name."
    )
    last_name = models.CharField(
        max_length=30, blank=True, null=True, help_text="The user's last name."
    )
    date_of_birth = models.DateField(
        blank=True, null=True, help_text="The user's date of birth."
    )
    location = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="The user's location (e.g., city, country).",
    )
    gender = models.CharField(
        max_length=10,
        choices=[
            ("M", "Male"),
            ("F", "Female"),
            ("O", "Other"),
            ("N", "Prefer not to say"),
        ],
        blank=True,
        null=True,
        help_text="The user's gender.",
    )
    bio = models.TextField(
        max_length=200,
        blank=True,
        null=True,
        help_text="A short biography about the user.",
    )
    website = models.URLField(
        blank=True, null=True, help_text="The user's personal or professional website."
    )

    def get_reputation(self):
        """Calculates the user's reputation based on their contributions and votes."""
        base_points = self.phrases.count() + self.translations.count()

        UPVOTE_POINT = 10
        DOWNVOTE_POINT = -2
        upvote_points = self.votes.filter(value=1).count() * UPVOTE_POINT
        downvote_points = self.votes.filter(value=-1).count() * DOWNVOTE_POINT

        return base_points + upvote_points + downvote_points

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
