from django.db import models
from users.models import User


class Language(models.Model):
    code = models.CharField(max_length=3, unique=True)
    name = models.CharField(max_length=32)

    class Meta:
        unique_together = ("code", "name")

    def __str__(self):
        return f"{self.name} ({self.code})"


class TextEntry(models.Model):
    content = models.TextField()
    lang = models.ForeignKey(Language, on_delete=models.PROTECT)
    author = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("content", "lang")

    def __str__(self):
        return f"{self.content} ({self.lang.code})"
