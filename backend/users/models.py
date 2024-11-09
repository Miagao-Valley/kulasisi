from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False, null=False)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(
        max_length=10,
        choices=[
            ("M", "Male"),
            ("F", "Female"),
            ("O", "Other"),
            ("", "Prefer not to say"),
        ],
        blank=True,
        null=True,
    )
    bio = models.TextField(max_length=200, blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.username
