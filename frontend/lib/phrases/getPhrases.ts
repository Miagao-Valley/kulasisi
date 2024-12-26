import fetcher from '@/utils/fetcher';
import { Phrase, PaginationDetails } from '@/types';

export default async function getPhrases(
  queryParams: Record<string, any> = {},
): Promise<PaginationDetails & { results: Phrase[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/phrases/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
