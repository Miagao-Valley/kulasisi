import fetcher from '@/utils/fetcher';
import { Translation, PaginationDetails } from '@/types';

export default async function getTranslations(
  id: number,
  queryParams: Record<string, any> = {}
): Promise<PaginationDetails & { results: Translation[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/text-entries/${id}/translations/${
    queryString ? `?${queryString}` : ''
  }`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
