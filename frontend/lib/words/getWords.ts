import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Paginated } from '@/types/core';
import { Word } from '@/types/dictionary';

export default async function getWords(
  params: Record<string, any> = {}
): Promise<Paginated<Word[]>> {
  const { data: fetchedData } = await fetchAPI(`/dictionary/`, {
    params: params,
    authorized: true,
    cache: 'no-store',
  });

  for (const entry of fetchedData.results) {
    if (entry?.created_at) {
      entry.created_at = new Date(entry.created_at);
    }
    if (entry?.updated_at) {
      entry.updated_at = new Date(entry.updated_at);
    }
  }

  return fetchedData;
}
