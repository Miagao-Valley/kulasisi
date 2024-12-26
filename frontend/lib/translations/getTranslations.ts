import fetcher from '@/utils/fetcher';
import { Translation, PaginationDetails } from '@/types';

export default async function getTranslations(
  queryParams: Record<string, any> = {},
  phraseId?: number,
): Promise<PaginationDetails & { results: Translation[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/phrases/translations/?phrase=${phraseId || ''}&${queryString}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
