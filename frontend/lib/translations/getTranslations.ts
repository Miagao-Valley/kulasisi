import fetcher from '@/utils/fetcher';
import { Translation, PaginationDetails } from '@/types';

export default async function getTranslations(
  textEntryId: number,
  queryParams: Record<string, any> = {}
): Promise<PaginationDetails & { results: Translation[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/translations/?text_entry=${textEntryId}&${queryString}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
