import json
import os
from django.core.management.base import BaseCommand
from django.apps import apps


class Command(BaseCommand):
    help = "Load all fixtures"

    FIXTURES = {
        "languages.Language": "languages/fixtures/languages.json",
        "phrases.Category": "phrases/fixtures/categories.json",
        "dictionary.PartOfSpeech": "dictionary/fixtures/parts_of_speech.json",
    }

    def handle(self, *args, **kwargs):
        for model_name, fixture_path in self.FIXTURES.items():
            app_label, model_class = model_name.split(".")
            Model = apps.get_model(app_label, model_class)

            if not os.path.exists(fixture_path):
                self.stdout.write(
                    self.style.WARNING(f"Fixture {fixture_path} not found, skipping...")
                )
                continue

            with open(fixture_path, "r") as file:
                data = json.load(file)
                for obj in data:
                    if "fields" in obj:
                        fields = obj["fields"]
                        Model.objects.get_or_create(**{k: v for k, v in fields.items()})

            self.stdout.write(
                self.style.SUCCESS(f"Loaded {model_class} from {fixture_path}")
            )
