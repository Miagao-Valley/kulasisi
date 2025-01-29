from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from users.models import User

User = get_user_model()


class Vote(models.Model):
    """
    Represents a vote by a user on an entry (Phrase, Word, Definition, etc.).
    """

    VOTE_CHOICES = [
        (1, "Upvote"),
        (-1, "Downvote"),
        (0, "Unvote"),
    ]

    CONTENT_TYPE_CHOICES = [
        ("phrase", "Phrase"),
        ("word", "Word"),
        ("translation", "Translation"),
        ("definition", "Definition"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="votes",
        help_text="The user who cast this vote.",
    )
    content_type = models.ForeignKey(
        ContentType,
        on_delete=models.CASCADE,
        help_text="The content type of the object being voted on.",
        limit_choices_to={"model__in": [choice[0] for choice in CONTENT_TYPE_CHOICES]},
    )
    object_id = models.PositiveIntegerField(
        help_text="The ID of the object being voted on."
    )
    content_object = GenericForeignKey("content_type", "object_id")
    value = models.SmallIntegerField(
        choices=VOTE_CHOICES,
        help_text="The type of vote: Upvote (1), Downvote (-1), or Unvote (0).",
    )
    voted_at = models.DateTimeField(
        auto_now=True, help_text="The timestamp when the vote was last modified."
    )

    class Meta:
        verbose_name = "Vote"
        verbose_name_plural = "Votes"
        unique_together = (
            "user",
            "content_type",
            "object_id",
        )  # Ensures a user can only vote once per object

    def __str__(self):
        return f"{self.get_value_display()} by {self.user.username} on {self.content_type.model} {self.object_id}"
