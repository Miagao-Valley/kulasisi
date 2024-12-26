import fetcher from '@/utils/fetcher';
import { Word, PaginationDetails } from '@/types';

export default async function getWords(
  queryParams: Record<string, any> = {},
): Promise<PaginationDetails & { results: Word[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/words/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
