import fetcher from '@/utils/fetcher';
import { PaginationDetails } from '@/types/core';
import { Translation } from '@/types/phrases';

export default async function getTranslations(
  queryParams: Record<string, any> = {},
  phraseId?: number,
): Promise<PaginationDetails & { results: Translation[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/phrases/translations/?phrase=${phraseId || ''}&${queryString}`;

  const res = await fetcher(url, {
    cache: 'no-store',
  });
  for (const entry of res.results) {
    if ('created_at' in entry && 'updated_at' in entry) {
      entry.created_at = new Date(entry.created_at);
      entry.updated_at = new Date(entry.updated_at);
    }
  }
  return res;
}
