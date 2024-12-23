# Generated by Django 5.1.1 on 2024-11-09 07:28

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0003_alter_user_gender"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="date_of_birth",
            field=models.DateField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="user",
            name="first_name",
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name="user",
            name="gender",
            field=models.CharField(
                blank=True,
                choices=[
                    ("M", "Male"),
                    ("F", "Female"),
                    ("O", "Other"),
                    ("N", "Prefer not to say"),
                ],
                max_length=10,
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="last_name",
            field=models.CharField(max_length=30),
        ),
    ]
