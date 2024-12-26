import fetcher from '@/utils/fetcher';
import { Definition, PaginationDetails } from '@/types';

export default async function getDefinitions(
  queryParams: Record<string, any> = {},
  wordId?: number,
): Promise<PaginationDetails & { results: Definition[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/definitions/?word=${wordId || ''}&${queryString}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
