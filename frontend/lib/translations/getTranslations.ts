import fetcher from '@/utils/fetcher';
import { Translation, PaginationDetails } from '@/types';

export default async function getTranslations(
  queryParams: Record<string, any> = {},
  textEntryId?: number
): Promise<PaginationDetails & { results: Translation[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/translations/?text_entry=${textEntryId || ''}&${queryString}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
