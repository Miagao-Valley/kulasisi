# Generated by Django 5.1.4 on 2025-01-11 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dictionary", "0004_definition_source_link_definition_source_title_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="historicalword",
            name="source_link",
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="historicalword",
            name="source_title",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name="word",
            name="source_link",
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="word",
            name="source_title",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]