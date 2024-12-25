import fetcher from '@/utils/fetcher';
import { PhraseEntry, PaginationDetails } from '@/types';

export default async function getPhraseEntries(
  queryParams: Record<string, any> = {},
): Promise<PaginationDetails & { results: PhraseEntry[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/phrase-entries/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
