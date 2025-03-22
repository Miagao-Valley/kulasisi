import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Paginated } from '@/types/core';
import { DefinitionRevision } from '@/types/dictionary';

export default async function getDefinitionRevisions(
  id: number
): Promise<Paginated<DefinitionRevision[]>> {
  const { data: fetchedData } = await fetchAPI(
    `/dictionary/definitions/${id}/history/`,
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
