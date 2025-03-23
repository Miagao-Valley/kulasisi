import { Entry } from '@/types/core';
import { isPhrase, isTranslation } from '@/types/phrases';
import { isDefinition, isWord } from '@/types/dictionary';

/**
 * Converts an entry object to its corresponding path based on entry type.
 *
 * @param entry - The entry object to convert to a path.
 * @param backend - If true, generates a path for backend usage, otherwise for frontend.
 * @returns The corresponding path string for the entry.
 */
export function entryToPath(entry: Entry, backend: boolean = true): string {
  if (isPhrase(entry)) {
    return `phrases/${entry.id}`;
  }

  if (isTranslation(entry)) {
    return backend
      ? `phrases/translations/${entry.id}`
      : `phrases/${entry.phrase}`;
  }

  if (isWord(entry)) {
    return `dictionary/${entry.lang}/${entry.word}`;
  }

  if (isDefinition(entry)) {
    return backend
      ? `dictionary/definitions/${entry.id}`
      : `dictionary/${entry.word.lang}/${entry.word.word}`;
  }

  throw new Error('Invalid entry type');
}
