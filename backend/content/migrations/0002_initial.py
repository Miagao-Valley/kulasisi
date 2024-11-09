# Generated by Django 5.1.1 on 2024-11-03 03:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("content", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="historicaltextentry",
            name="author",
            field=models.ForeignKey(
                blank=True,
                db_constraint=False,
                null=True,
                on_delete=django.db.models.deletion.DO_NOTHING,
                related_name="+",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="historicaltextentry",
            name="history_user",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="+",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AlterUniqueTogether(
            name="language",
            unique_together={("code", "name")},
        ),
        migrations.AddField(
            model_name="historicaltextentry",
            name="lang",
            field=models.ForeignKey(
                blank=True,
                db_constraint=False,
                null=True,
                on_delete=django.db.models.deletion.DO_NOTHING,
                related_name="+",
                to="content.language",
            ),
        ),
        migrations.AddField(
            model_name="textentry",
            name="author",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="text_entries",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="textentry",
            name="lang",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="text_entries",
                to="content.language",
            ),
        ),
        migrations.AlterUniqueTogether(
            name="textentry",
            unique_together={("content", "lang")},
        ),
    ]