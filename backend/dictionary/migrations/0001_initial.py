# Generated by Django 5.1.4 on 2025-01-29 04:11

import django.core.validators
import simple_history.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Definition",
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
                    "description",
                    models.TextField(
                        help_text="The definition of the word.", max_length=512
                    ),
                ),
                (
                    "usage_note",
                    models.TextField(
                        blank=True,
                        help_text="Additional notes on the usage of the word.",
                        null=True,
                    ),
                ),
                (
                    "source_title",
                    models.CharField(
                        blank=True,
                        help_text="The title of the source.",
                        max_length=255,
                        null=True,
                    ),
                ),
                (
                    "source_link",
                    models.URLField(
                        blank=True,
                        help_text="A link to the source of the definition.",
                        null=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Definition",
                "verbose_name_plural": "Definitions",
            },
        ),
        migrations.CreateModel(
            name="HistoricalDefinition",
            fields=[
                (
                    "id",
                    models.BigIntegerField(
                        auto_created=True, blank=True, db_index=True, verbose_name="ID"
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        help_text="The definition of the word.", max_length=512
                    ),
                ),
                (
                    "usage_note",
                    models.TextField(
                        blank=True,
                        help_text="Additional notes on the usage of the word.",
                        null=True,
                    ),
                ),
                (
                    "source_title",
                    models.CharField(
                        blank=True,
                        help_text="The title of the source.",
                        max_length=255,
                        null=True,
                    ),
                ),
                (
                    "source_link",
                    models.URLField(
                        blank=True,
                        help_text="A link to the source of the definition.",
                        null=True,
                    ),
                ),
                ("created_at", models.DateTimeField(blank=True, editable=False)),
                ("updated_at", models.DateTimeField(blank=True, editable=False)),
                ("history_id", models.AutoField(primary_key=True, serialize=False)),
                ("history_date", models.DateTimeField(db_index=True)),
                ("history_change_reason", models.CharField(max_length=100, null=True)),
                (
                    "history_type",
                    models.CharField(
                        choices=[("+", "Created"), ("~", "Changed"), ("-", "Deleted")],
                        max_length=1,
                    ),
                ),
            ],
            options={
                "verbose_name": "historical Definition",
                "verbose_name_plural": "historical Definitions",
                "ordering": ("-history_date", "-history_id"),
                "get_latest_by": ("history_date", "history_id"),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name="HistoricalWord",
            fields=[
                (
                    "id",
                    models.BigIntegerField(
                        auto_created=True, blank=True, db_index=True, verbose_name="ID"
                    ),
                ),
                (
                    "word",
                    models.CharField(
                        help_text="The word itself, containing only alphanumeric characters, dashes, underscores, and spaces.",
                        max_length=64,
                        validators=[
                            django.core.validators.RegexValidator(
                                message="Invalid word. Only alphanumeric characters, dashes, and underscores are allowed.",
                                regex="^[a-zA-Z0-9\\-_ ]+$",
                            )
                        ],
                    ),
                ),
                (
                    "source_title",
                    models.CharField(
                        blank=True,
                        help_text="The title of the source.",
                        max_length=255,
                        null=True,
                    ),
                ),
                (
                    "source_link",
                    models.URLField(
                        blank=True,
                        help_text="A link to the source of the word.",
                        null=True,
                    ),
                ),
                ("created_at", models.DateTimeField(blank=True, editable=False)),
                ("updated_at", models.DateTimeField(blank=True, editable=False)),
                ("history_id", models.AutoField(primary_key=True, serialize=False)),
                ("history_date", models.DateTimeField(db_index=True)),
                ("history_change_reason", models.CharField(max_length=100, null=True)),
                (
                    "history_type",
                    models.CharField(
                        choices=[("+", "Created"), ("~", "Changed"), ("-", "Deleted")],
                        max_length=1,
                    ),
                ),
            ],
            options={
                "verbose_name": "historical Word",
                "verbose_name_plural": "historical Words",
                "ordering": ("-history_date", "-history_id"),
                "get_latest_by": ("history_date", "history_id"),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name="PartOfSpeech",
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
                    "abbr",
                    models.CharField(
                        help_text="Abbreviation for the part of speech (e.g., 'adj' for Adjective).",
                        max_length=8,
                        unique=True,
                    ),
                ),
                (
                    "name",
                    models.CharField(
                        help_text="Full name of the part of speech (e.g., 'Adjective').",
                        max_length=64,
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        blank=True,
                        help_text="A brief description of the part of speech.",
                        max_length=255,
                        null=True,
                    ),
                ),
            ],
            options={
                "verbose_name": "Part of Speech",
                "verbose_name_plural": "Parts of Speech",
            },
        ),
        migrations.CreateModel(
            name="Word",
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
                    "word",
                    models.CharField(
                        help_text="The word itself, containing only alphanumeric characters, dashes, underscores, and spaces.",
                        max_length=64,
                        validators=[
                            django.core.validators.RegexValidator(
                                message="Invalid word. Only alphanumeric characters, dashes, and underscores are allowed.",
                                regex="^[a-zA-Z0-9\\-_ ]+$",
                            )
                        ],
                    ),
                ),
                (
                    "source_title",
                    models.CharField(
                        blank=True,
                        help_text="The title of the source.",
                        max_length=255,
                        null=True,
                    ),
                ),
                (
                    "source_link",
                    models.URLField(
                        blank=True,
                        help_text="A link to the source of the word.",
                        null=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Word",
                "verbose_name_plural": "Words",
            },
        ),
    ]
