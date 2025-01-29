import json
from dictionary.models import Word, Definition, PartOfSpeech
from languages.models import Language
from users.models import User


def process_dictionary_json(data: str, contributor: User):
    """
    Process a JSON file and populate the dictionary models.
    """
    try:
        entries = json.loads(data)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return

    total_entries = len(entries)
    print(f"Processing {total_entries} entries of a dictionary JSON...")

    added_entries, skipped_entries = 0, 0

    for i, entry in enumerate(entries, start=1):
        word_text = entry.get("word", "").strip()
        print(f"Processing word {i}/{total_entries}: '{word_text}'")

        if not word_text:
            print(f"Error: Word empty. Skipping word.")
            skipped_entries += 1
            continue

        word_lang = Language.objects.filter(code=entry.get("lang", "").strip()).first()
        if not word_lang:
            print("Error: Invalid language for word. Skipping word.")
            skipped_entries += 1
            continue

        source_title = entry.get("source_title", "")
        source_link = entry.get("source_link", "")

        definition_entries = entry.get("definitions", [])

        # Check if the word already exists
        existing_word = Word.objects.filter(word=word_text, lang=word_lang).first()
        if existing_word:
            print(f"Word '{word_text}' already exists.")
            word = existing_word
        else:
            word = Word.objects.create(
                word=word_text,
                lang=word_lang,
                contributor=contributor,
                source_title=source_title,
                source_link=source_link,
            )
            added_entries += 1

        # Process definitions
        for definition_entry in definition_entries:
            definition_text = definition_entry.get("description", "").strip()
            definition_lang = Language.objects.filter(
                code=entry.get("lang", "").strip()
            ).first()
            pos_abbr = definition_entry.get("pos", "")
            synonyms = definition_entry.get("synonyms", [])
            antonyms = definition_entry.get("antonyms", [])
            usage_note = definition_entry.get("usage_note", "")
            definition_source_title = definition_entry.get("source_title", source_title)
            definition_source_link = definition_entry.get("source_link", source_link)

            if not definition_lang:
                print(f"Invalid language for definition. Skipping definition.")
                skipped_entries += 1
                continue
            if (
                not definition_text
                and not pos_abbr
                and not synonyms
                and not antonyms
                and not usage_note
            ):
                print(f"Definition has no content. Skipping translation.")
                skipped_entries += 1
                continue

            # Check if pos exists
            try:
                pos = PartOfSpeech.objects.get(abbr=pos_abbr)
            except PartOfSpeech.DoesNotExist:
                print(
                    f"Error: POS '{pos_abbr}' not found. Skipping definition for word '{word_text}'."
                )
                skipped_entries += 1
                continue

            # Check if the definition already exists
            existing_definition = Definition.objects.filter(
                word=word, lang=definition_lang, description=definition_text
            ).first()
            if existing_definition:
                print(f"Definition for word '{word_text}' already exists.")
                skipped_entries += 1
                continue
            else:
                definition = Definition.objects.create(
                    word=word,
                    lang=definition_lang,
                    description=definition_text,
                    contributor=contributor,
                    pos=pos,
                    usage_note=usage_note,
                    source_title=definition_source_title,
                    source_link=definition_source_link,
                )
                added_entries += 1

            # Process synonyms and antonyms
            synonym_words = []
            antonym_words = []

            for synonym_text in synonyms:
                synonym_text = synonym_text.strip()
                try:
                    synonym_word = Word.objects.get(word=synonym_text, lang=word_lang)
                    synonym_words.append(synonym_word)
                except Word.DoesNotExist:
                    print(
                        f"Error: Synonym '{synonym_text}' not found. Skipping synonym."
                    )
                    continue

            for antonym_text in antonyms:
                antonym_text = antonym_text.strip()
                try:
                    antonym_word = Word.objects.get(word=antonym_text, lang=word_lang)
                    antonym_words.append(antonym_word)
                except Word.DoesNotExist:
                    print(
                        f"Error: Antonym '{antonym_text}' not found. Skipping antonym."
                    )
                    continue

            definition.synonyms.set(synonym_words)
            definition.antonyms.set(antonym_words)

        print(f"Processed {i}/{total_entries} words")

    print(f"\nFinished processing all {total_entries} entries.")
    print(f"Added entries: {added_entries}")
    print(f"Skipped entries: {skipped_entries}\n")
