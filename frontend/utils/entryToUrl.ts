import { Entry } from '@/types/core';
import { isPhrase, isTranslation } from '@/types/phrases';
import { isDefinition, isWord } from '@/types/dictionary';

/**
 * Converts an entry object to its corresponding URL based on entry type.
 *
 * @param entry - The entry object to convert to a URL.
 * @param backend - If true, generates a URL for backend usage, otherwise for frontend.
 * @returns The corresponding URL string for the entry.
 */
export default function entryToUrl(
  entry: Entry,
  backend: boolean = true,
): string {
  // URL for a phrase entry
  if (isPhrase(entry)) {
    return `phrases/${entry.id}`;
  }
  // URL for a translation entry
  else if (isTranslation(entry)) {
    return backend
      ? `phrases/translations/${entry.id}`
      : `phrases/${entry.phrase}`;
  }
  // URL for a word entry
  else if (isWord(entry)) {
    return backend
      ? `/dictionary/${entry.lang}/${entry.word}`
      : `dictionary/${entry.lang}/${entry.word}`;
  }
  // URL for a definition entry
  else if (isDefinition(entry)) {
    return backend
      ? `dictionary/definitions/${entry.id}`
      : `dictionary/${entry.word.lang}/${entry.word.word}`;
  }
  // Return an empty string if the entry type is unrecognized
  else {
    return '';
  }
}
