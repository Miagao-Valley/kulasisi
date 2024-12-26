import fetcher from '@/utils/fetcher';
import { PaginationDetails } from '@/types/core';
import { DefinitionRevision } from '@/types/dictionary';

export default async function getDefinitionRevisions(
  id: number,
): Promise<PaginationDetails & { results: DefinitionRevision[] }> {
  const res = await fetcher(`/dictionary/definitions/${id}/history/`, {
    cache: 'no-store',
  });
  for (const entry of res.results) {
    if ('history_date' in entry) {
      entry.history_date = new Date(entry.history_date);
    }
  }
  return res;
}
