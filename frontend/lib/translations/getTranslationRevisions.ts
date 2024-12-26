import fetcher from '@/utils/fetcher';
import { PaginationDetails } from '@/types/core';
import { TranslationRevision } from '@/types/phrases';

export default async function getTranslationRevisions(
  id: number,
): Promise<PaginationDetails & { results: TranslationRevision[] }> {
  const res = await fetcher(`/phrases/translations/${id}/history/`, {
    cache: 'no-store',
  });
  for (const entry of res.results) {
    if ('history_date' in entry) {
      entry.history_date = new Date(entry.history_date);
    }
  }
  return res;
}
