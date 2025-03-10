import fetcher from '@/utils/fetcher';
import { PaginationDetails } from '@/types/core';
import { WordRevision } from '@/types/dictionary';

export default async function getWordRevisions(
  lang: string,
  word: string,
): Promise<PaginationDetails & { results: WordRevision[] }> {
  const res = await fetcher(`/dictionary/${lang}/${word}/history/`, {
    cache: 'no-store',
  });
  for (const entry of res.results) {
    if ('history_date' in entry) {
      entry.history_date = new Date(entry.history_date);
    }
  }
  return res;
}
