import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Paginated } from '@/types/core';
import { Translation } from '@/types/phrases';

export async function getTranslations(
  phraseId?: number,
  params: Record<string, any> = {}
): Promise<Paginated<Translation[]>> {
  const { data: fetchedData } = await fetchAPI(`/phrases/translations/`, {
    params: { ...params, phrase: phraseId },
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
