'use server';

import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Paginated } from '@/types/core';
import { Phrase } from '@/types/phrases';
import { Word } from '@/types/dictionary';

export default async function getHomeFeed(
  params: Record<string, any> = {}
): Promise<Paginated<Phrase[] | Word[]>> {
  const { data: fetchedData } = await fetchAPI(`/core/home-feed/`, {
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
