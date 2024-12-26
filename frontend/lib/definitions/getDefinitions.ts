import fetcher from '@/utils/fetcher';
import { Definition, PaginationDetails } from '@/types';

export default async function getDefinitions(
  queryParams: Record<string, any> = {},
  dictEntryId?: number,
): Promise<PaginationDetails & { results: Definition[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/definitions/?dict_entry=${dictEntryId || ''}&${queryString}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
