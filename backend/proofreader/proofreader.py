import argparse
import logging
import nltk
import os
import pkg_resources
import re
import string
from nltk.tokenize import word_tokenize, sent_tokenize
from symspellpy import SymSpell, Verbosity
from tabulate import tabulate
from .constants import SUPPORTED_LANGUAGES

# Configure logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("Proofreader")

# Download nltk resources
for resource in ("punkt", "punkt_tab"):
    try:
        nltk.data.find(f"tokenizers/{resource}")
    except LookupError:
        nltk.download(resource)

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))

RULES = {
    "SPELL_UNKNOWN": {
        "message": "Unknown word.",
        "level": "error",
    },
    "CAPS_START": {
        "message": "Sentence must start with a capital.",
        "level": "warning",
    },
    "PUNCT_MISSING": {
        "message": "Missing proper punctuation at the end.",
        "level": "warning",
    },
    "SPACE_OVERUSE": {
        "message": "Too many consecutive spaces.",
        "level": "info",
    },
}

LEVEL_MAP = {
    "error": 1.0,
    "warning": 0.5,
    "info": 0.25,
}


def main():
    argparser = argparse.ArgumentParser("Proofread text in a specific language.")
    argparser.add_argument(
        "-l",
        "--language",
        choices=SUPPORTED_LANGUAGES,
        default="eng",
        help="The language to proofread in.",
    )
    argparser.add_argument(
        "text",
        nargs="*",
        help="The text to proofread.",
    )
    args = argparser.parse_args()

    text = " ".join(args.text) if args.text else input("text: ")

    flagged_tokens, stats = proofread_text(text, args.language)
    if not flagged_tokens or not stats:
        return

    print("\n" + tabulate(flagged_tokens, headers="keys") + "\n")
    for stat, value in stats.items():
        print(f"{stat}: {value}")


def proofread_text(
    text: str, lang: str, max_suggestions: int = 5
) -> tuple[list[dict], dict]:
    logger.info(f"Proofreading ({lang or 'no language'}):\n{text}")

    if not lang:
        raise ValueError("Language must be provided.")
    if lang not in SUPPORTED_LANGUAGES:
        raise ValueError(f"Unsupported language: {lang}")

    spell = get_spellchecker(lang)
    logger.info("Initialized spellchecker.")

    tokens = word_tokenize(text.strip())
    sentences = [
        sentence for t in text.strip().split("\n") for sentence in sent_tokenize(t)
    ]
    logger.info(f"Processing tokens: {tokens}")

    flagged_tokens = []

    # Check for sentence-level errors
    prev_sentence_end = 0
    for sentence in sentences:
        sentence = sentence.strip()
        start_idx = text.find(sentence, prev_sentence_end)
        prev_sentence_end = start_idx + len(sentence)

        # Capitalization check
        if sentence and not sentence[0].isupper():
            first_word = sentence.split()[0]
            flagged_tokens.append(
                {
                    "offset": start_idx,
                    "token": first_word,
                    "suggestions": [first_word.capitalize()],
                    "rule_id": "CAPS_START",
                    **RULES["CAPS_START"],
                }
            )

        # Punctuation check
        if len(tokens) > 1 and sentence and sentence[-1] not in ".!?":
            last_word = sentence.split()[-1]

            if last_word[-1] in string.punctuation:
                suggestions = [last_word[:-1] + p for p in ".!?"]
            else:
                suggestions = [last_word + p for p in ".!?"]

            flagged_tokens.append(
                {
                    "offset": start_idx + len(sentence) - len(last_word),
                    "token": last_word,
                    "suggestions": suggestions,
                    "rule_id": "PUNCT_MISSING",
                    **RULES["PUNCT_MISSING"],
                }
            )

    # Check for word-level errors
    IGNORE_TOKEN = r"[^a-zA-Z'-]+"
    prev_end = 0
    for token in tokens:
        start_idx = text.find(token, prev_end)
        prev_end = start_idx + len(token)

        if re.match(IGNORE_TOKEN, token):
            continue

        correct_spelling = token.strip().lower() in spell.words

        suggestions = spell.lookup(
            token,
            Verbosity.CLOSEST,
            max_edit_distance=2,
            ignore_token=r"[^a-zA-Z'-]+",
            transfer_casing=True,
        )
        suggestions = [s.term for s in suggestions[:max_suggestions] if s.term != token]

        result = spell.word_segmentation(token)
        if result and result.corrected_string not in suggestions:
            suggestions.append(result.corrected_string)

        if not correct_spelling:
            flagged_tokens.append(
                {
                    "offset": start_idx,
                    "token": token,
                    "suggestions": suggestions,
                    "rule_id": "SPELL_UNKNOWN",
                    **RULES["SPELL_UNKNOWN"],
                }
            )

    # Check for excessive whitespace
    matches = re.finditer(r"(\S)( {2,})(\S)", text)
    for match in matches:
        flagged_tokens.append(
            {
                "offset": match.start(2),
                "token": match.group(2),
                "suggestions": [re.sub(r" {2,}", " ", match.group(2))],
                "rule_id": "SPACE_OVERUSE",
                **RULES["SPACE_OVERUSE"],
            }
        )

    token_count = len(tokens)
    flagged_count = len(flagged_tokens)
    correctness = cal_correctness(token_count, flagged_tokens)
    stats = {
        "token_count": token_count,
        "flagged_count": flagged_count,
        "correctness": correctness,
    }

    logger.info("Finished proofreading")
    return flagged_tokens, stats


def cal_correctness(token_count: int, flagged_tokens: list) -> float:
    if token_count == 0:
        return 0.0

    total_penalty = 0.0
    for flagged_token in flagged_tokens:
        level = flagged_token.get("level", "warning")
        total_penalty += LEVEL_MAP.get(level, 1.0)

    correctness = max(1 - total_penalty / token_count, 0.0)

    return round(correctness, 2)


def get_spellchecker(lang: str) -> SymSpell:
    spell = SymSpell()
    filepath = os.path.join(SCRIPT_DIR, f"../data/freqlist_{lang}.txt")
    if not os.path.exists(filepath):
        logger.warning(f"File does not exist: {filepath}")
        if lang == "eng":
            filepath = pkg_resources.resource_filename(
                "symspellpy", "frequency_dictionary_en_82_765.txt"
            )
            logger.info(f"Defaulting to: {filepath}")
        else:
            raise ValueError(f"Unsupported language: {lang}")

    spell.load_dictionary(filepath, 0, 1, " ")
    return spell


if __name__ == "__main__":
    main()
