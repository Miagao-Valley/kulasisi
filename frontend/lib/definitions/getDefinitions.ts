'use server';

import fetcher from '@/utils/fetcher';
import getToken from '../tokens/getToken';
import { PaginationDetails } from '@/types/core';
import { Definition } from '@/types/dictionary';

export default async function getDefinitions(
  queryParams: Record<string, any> = {},
  wordLang: string,
  word: string
): Promise<PaginationDetails & { results: Definition[] }> {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `/dictionary/definitions/?word__word=${
    word || ''
  }&word__lang__code=${wordLang || ''}&${queryString}`;

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
