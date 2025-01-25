from django.core.management.base import BaseCommand
from users.models import User
from phrases.utils import process_phrasebook_json


class Command(BaseCommand):
    help = "Import a JSON file into the phrases models"

    def add_arguments(self, parser):
        parser.add_argument("json_file", type=str, help="Path to the JSON file")
        parser.add_argument(
            "-c",
            "--contributor",
            type=str,
            required=True,
            help="Username of the contributor",
        )

    def handle(self, *args, **kwargs):
        json_file_path = kwargs["json_file"]
        contributor_username = kwargs["contributor"]

        try:
            contributor = User.objects.get(username=contributor_username)
        except User.DoesNotExist:
            self.stdout.write(
                self.style.ERROR(f"User '{contributor_username}' not found.")
            )
            return

        try:
            with open(json_file_path, mode="r", encoding="utf-8") as f:
                json_data = f.read()
                process_phrasebook_json(json_data, contributor)
                self.stdout.write(
                    self.style.SUCCESS(
                        f"JSON file '{json_file_path}' successfully processed."
                    )
                )
        except FileNotFoundError:
            self.stdout.write(self.style.ERROR(f"File '{json_file_path}' not found."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"An error occurred: {e}"))
