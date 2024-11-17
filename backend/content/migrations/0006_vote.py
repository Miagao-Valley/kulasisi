# Generated by Django 5.1.1 on 2024-11-16 15:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0005_rename_language_languageproficiency_lang_and_more"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Vote",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "value",
                    models.SmallIntegerField(
                        choices=[(1, "Upvote"), (-1, "Downvote"), (0, "Unvote")]
                    ),
                ),
                ("voted_at", models.DateTimeField(auto_now=True)),
                (
                    "text_entry",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="votes",
                        to="content.textentry",
                    ),
                ),
                (
                    "translation",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="votes",
                        to="content.translation",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="votes",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "constraints": [
                    models.UniqueConstraint(
                        condition=models.Q(("text_entry__isnull", False)),
                        fields=("user", "text_entry"),
                        name="unique_textentry_vote",
                    ),
                    models.UniqueConstraint(
                        condition=models.Q(("translation__isnull", False)),
                        fields=("user", "translation"),
                        name="unique_translation_vote",
                    ),
                ],
            },
        ),
    ]
