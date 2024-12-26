import fetcher from '@/utils/fetcher';
import { PaginationDetails } from '@/types/core';
import { Word } from '@/types/dictionary';

export default async function getWords(
  queryParams: Record<string, any> = {},
): Promise<PaginationDetails & { results: Word[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/dictionary/${queryString ? `?${queryString}` : ''}`;

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
