import { fetchAPI } from '@/utils/fetchAPI';
import { Paginated } from '@/types/core';
import { PhraseRevision } from '@/types/phrases';

export default async function getPhraseRevisions(
  id: number
): Promise<Paginated<PhraseRevision[]>> {
  const { data: fetchedData } = await fetchAPI(`/phrases/${id}/history/`, {
    cache: 'no-store',
  });

  for (const entry of fetchedData.results) {
    if (entry?.history_date) {
      entry.history_date = new Date(entry.history_date);
    }
  }

  return fetchedData;
}
