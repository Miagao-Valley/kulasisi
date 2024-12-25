import fetcher from '@/utils/fetcher';
import { Translation, PaginationDetails } from '@/types';

export default async function getTranslations(
  queryParams: Record<string, any> = {},
  phraseEntryId?: number,
): Promise<PaginationDetails & { results: Translation[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/translations/?phrase_entry=${phraseEntryId || ''}&${queryString}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
