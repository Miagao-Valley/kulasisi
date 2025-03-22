import { fetchAPI } from '@/utils/fetchAPI';
import { Paginated } from '@/types/core';
import { Definition } from '@/types/dictionary';

export default async function getDefinitions(
  wordLang?: string,
  word?: string,
  params: Record<string, any> = {}
): Promise<Paginated<Definition[]>> {
  const { data: fetchedData } = await fetchAPI(`/dictionary/definitions/`, {
    params: {
      ...params,
      word__lang__code: wordLang,
      word__word: word,
    },
    authorized: true,
    cache: 'no-store',
  });

  for (const entry of fetchedData.results) {
    if (entry?.created_at) {
      entry.created_at = new Date(entry.created_at);
    }
    if (entry?.updated_at) {
      entry.updated_at = new Date(entry.updated_at);
    }
  }

  return fetchedData;
}
