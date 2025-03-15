'use server';

import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '@/lib/tokens/getToken';
import { PaginationDetails } from '@/types/core';
import { Phrase } from '@/types/phrases';
import { Word } from '@/types/dictionary';

export default async function getHomeFeed(
  queryParams: Record<string, any> = {}
): Promise<{
  result: (PaginationDetails & { results: (Phrase | Word)[] }) | null;
  error: any;
}> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/core/home-feed/${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetcher(
      url,
      {
        cache: 'no-store',
      },
      getToken()
    );

    if (response && response.results) {
      for (const entry of response.results) {
        if ('created_at' in entry && 'updated_at' in entry) {
          entry.created_at = new Date(entry.created_at);
          entry.updated_at = new Date(entry.updated_at);
        }
      }
    }

    return { result: response, error: null };
  } catch (error) {
    const fetchError = error as FetchError;
    return { result: null, error: fetchError.resBody };
  }
}
