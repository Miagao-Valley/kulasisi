import fetcher from '@/utils/fetcher';
import { PaginationDetails } from '@/types/core';
import { PhraseRevision } from '@/types/phrases';

export default async function getPhraseRevisions(
  id: number,
): Promise<PaginationDetails & { results: PhraseRevision[] }> {
  const res = await fetcher(`/phrases/${id}/history/`, {
    cache: 'no-store',
  });
  for (const entry of res.results) {
    if ('history_date' in entry) {
      entry.history_date = new Date(entry.history_date);
    }
  }
  return res;
}
