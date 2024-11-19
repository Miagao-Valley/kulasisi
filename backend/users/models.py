from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    first_name = models.CharField(max_length=30, blank=False, null=False)
    last_name = models.CharField(max_length=30, blank=False, null=False)
    date_of_birth = models.DateField(blank=False, null=False)
    location = models.CharField(max_length=255, blank=True, null=True)
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
    )
    bio = models.TextField(max_length=200, blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    def get_reputation(self):
        base_points = self.text_entries.count() + self.translations.count()

        upvote_points = self.votes.filter(value=1).count() * 10
        downvote_points = self.votes.filter(value=-1).count() * -2

        total_reputation = base_points + upvote_points + downvote_points
        return total_reputation

    def __str__(self):
        return self.username
