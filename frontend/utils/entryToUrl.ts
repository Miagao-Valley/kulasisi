import path from 'path';
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
  backend: boolean = true
): string {
  if (isPhrase(entry)) {
    return path.join('phrases', entry.id.toString());
  }

  if (isTranslation(entry)) {
    return backend
      ? path.join('phrases', 'translations', entry.id.toString())
      : path.join('phrases', entry.phrase.toString());
  }

  if (isWord(entry)) {
    return path.join('dictionary', entry.lang, entry.word);
  }

  if (isDefinition(entry)) {
    return backend
      ? path.join('dictionary', 'definitions', entry.id.toString())
      : path.join('dictionary', entry.word.lang, entry.word.word);
  }

  return '';
}
