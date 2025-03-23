import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Paginated } from '@/types/core';
import { Lang } from '@/types/languages';

export async function getLangs(
  params: Record<string, any> = {}
): Promise<Paginated<Lang[]>> {
  const { data: fetchedData } = await fetchAPI(`/languages/`, {
    params: params,
    cache: 'no-store',
  });

  return fetchedData;
}
