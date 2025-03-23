import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Paginated } from '@/types/core';
import { WordRevision } from '@/types/dictionary';

export async function getWordRevisions(
  lang: string,
  word: string
): Promise<Paginated<WordRevision[]>> {
  const { data: fetchedData } = await fetchAPI(
    `/dictionary/${lang}/${word}/history/`,
    {
      cache: 'no-store',
    }
  );

  for (const entry of fetchedData.results) {
    if (entry?.history_date) {
      entry.history_date = new Date(entry.history_date);
    }
  }

  return fetchedData;
}
