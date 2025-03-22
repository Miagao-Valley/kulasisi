import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Paginated } from '@/types/core';
import { TranslationRevision } from '@/types/phrases';

export default async function getTranslationRevisions(
  id: number
): Promise<Paginated<TranslationRevision[]>> {
  const { data: fetchedData } = await fetchAPI(
    `/phrases/translations/${id}/history/`,
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
