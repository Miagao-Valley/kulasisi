import fetcher from '@/utils/fetcher';
import { DictEntry, PaginationDetails } from '@/types';

export default async function getDictEntries(
  queryParams: Record<string, any> = {},
): Promise<PaginationDetails & { results: DictEntry[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/dict-entries/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
