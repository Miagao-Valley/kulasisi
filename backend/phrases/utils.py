import json
from phrases.models import Phrase, Category, Translation
from languages.models import Language
from users.models import User


def process_phrasebook_json(data: str, contributor: User):
    """
    Process a JSON file and populate the phrases models.
    """
    try:
        entries = json.loads(data)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return

    total_entries = len(entries)
    print(f"Processing {total_entries} entries of a phrasebook JSON...")

    added_entries, skipped_entries = 0, 0

    for i, entry in enumerate(entries, start=1):
        phrase_text = entry.get("phrase", "").strip()
        print(f"Processing phrase {i}/{total_entries}: '{phrase_text}'")

        if not phrase_text:
            print("Error: Phrase empty. Skipping phrase.")
            skipped_entries += 1
            continue

        phrase_lang = Language.objects.filter(
            code=entry.get("lang", "").strip()
        ).first()
        if not phrase_lang:
            print("Error: Invalid language for phrase. Skipping phrase.")
            skipped_entries += 1
            continue

        category_names = entry.get("categories", [])
        usage_note = entry.get("usage_note", "")
        source_title = entry.get("source_title", "")
        source_link = entry.get("source_link", "")

        translation_entries = entry.get("translations", [])

        # Check if the phrase already exists
        existing_phrase = Phrase.objects.filter(
            content=phrase_text, lang=phrase_lang
        ).first()
        if existing_phrase:
            print(f"Phrase '{phrase_text}' already exists.")
            phrase = existing_phrase
        else:
            phrase = Phrase.objects.create(
                content=phrase_text,
                lang=phrase_lang,
                contributor=contributor,
                usage_note=usage_note,
                source_title=source_title,
                source_link=source_link,
            )
            added_entries += 1

        # Process categories
        categories = []
        for category_name in category_names:
            category_name = category_name.strip()
            try:
                category = Category.objects.get(name=category_name)
                categories.append(category)
            except Category.DoesNotExist:
                print(
                    f"Error: Category '{category_name}' not found. Skipping category."
                )
                continue

        phrase.categories.set(categories)

        # Process translations
        for translation_entry in translation_entries:
            translation_text = translation_entry.get("content", "").strip()
            translation_lang = Language.objects.filter(
                code=entry.get("lang", "").strip()
            ).first()
            translation_source_title = translation_entry.get(
                "source_title", source_title
            )
            translation_source_link = translation_entry.get("source_link", source_link)

            if not translation_lang:
                print(f"Invalid language for translation. Skipping translation.")
                skipped_entries += 1
                continue
            if not translation_text:
                print(f"Translation has no content. Skipping translation.")
                skipped_entries += 1
                continue

            # Check if the translation already exists
            existing_translation = Translation.objects.filter(
                phrase=phrase, content=translation_text, lang=translation_lang
            ).first()
            if existing_translation:
                print(f"Translation for phrase '{phrase.content}' already exists.")
                skipped_entries += 1
                continue
            else:
                Translation.objects.create(
                    phrase=phrase,
                    content=translation_text,
                    lang=translation_lang,
                    contributor=contributor,
                    source_title=translation_source_title,
                    source_link=translation_source_link,
                )
                added_entries += 1

        print(f"Processed {i}/{total_entries} phrases")

    print(f"\nFinished processing all {total_entries} entries.")
    print(f"Added entries: {added_entries}")
    print(f"Skipped entries: {skipped_entries}\n")
