import fetcher from '@/utils/fetcher';
import { PaginationDetails } from '@/types/core';
import { Lang } from '@/types/languages';

export default async function getLangs(
  queryParams: Record<string, any> = {},
): Promise<PaginationDetails & { results: Lang[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/languages/${queryString ? `?${queryString}` : ''}`;

  return await fetcher(url, {
    cache: 'no-store',
  });
}
