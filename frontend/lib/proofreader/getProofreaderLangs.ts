'use server';

import { fetchAPI } from '@/lib/utils/fetchAPI';

export async function getProofreaderLangs(
  params: Record<string, any> = {}
): Promise<string[]> {
  const { data: fetchedData } = await fetchAPI(`/proofreader/languages/`, {
    params: params,
    cache: 'no-store',
  });

  return fetchedData;
}
