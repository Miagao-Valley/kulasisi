import { Entry } from '@/types/core';
import { isPhrase, isTranslation } from '@/types/phrases';
import { isDefinition, isWord } from '@/types/dictionary';

export default function entryToUrl(
  entry: Entry,
  backend: boolean = true,
): string {
  if (isPhrase(entry)) {
    return backend ? `/phrases/${entry.id}/` : `/phrases/${entry.id}/`;
  } else if (isTranslation(entry)) {
    return backend
      ? `/phrases/translations/${entry.id}/`
      : `/phrases/${entry.phrase}/`;
  } else if (isWord(entry)) {
    return backend ? `/dictionary/${entry.id}/` : `/dictionary/${entry.id}/`;
  } else if (isDefinition(entry)) {
    return backend
      ? `/dictionary/definitions/${entry.id}/`
      : `/dictionary/${entry.word}/`;
  } else {
    return '/';
  }
}
