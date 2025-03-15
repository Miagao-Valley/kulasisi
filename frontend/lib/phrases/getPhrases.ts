'use server';

import fetcher from '@/utils/fetcher';
import getToken from '../tokens/getToken';
import { PaginationDetails } from '@/types/core';
import { Phrase } from '@/types/phrases';

export default async function getPhrases(
  queryParams: Record<string, any> = {}
): Promise<PaginationDetails & { results: Phrase[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/phrases/${queryString ? `?${queryString}` : ''}`;

  const res = await fetcher(
    url,
    {
      cache: 'no-store',
    },
    getToken()
  );
  for (const entry of res.results) {
    if ('created_at' in entry && 'updated_at' in entry) {
      entry.created_at = new Date(entry.created_at);
      entry.updated_at = new Date(entry.updated_at);
    }
  }
  return res;
}
