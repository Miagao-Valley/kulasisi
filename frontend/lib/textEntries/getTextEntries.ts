import fetcher from '@/utils/fetcher';
import { TextEntry, PaginationDetails } from '@/types';

export default async function getTextEntries(
  queryParams: Record<string, any> = {},
): Promise<PaginationDetails & { results: TextEntry[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/text-entries/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
