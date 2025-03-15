'use server';

import fetcher from '@/utils/fetcher';
import getToken from '../tokens/getToken';
import { Word } from '@/types/dictionary';

export default async function getWord(
  lang: string,
  word: string
): Promise<Word> {
  const res = await fetcher(
    `/dictionary/${lang}/${word}/`,
    {
      cache: 'no-store',
    },
    getToken()
  );
  if ('created_at' in res && 'updated_at' in res) {
    res.created_at = new Date(res.created_at);
    res.updated_at = new Date(res.updated_at);
  }
  return res;
}
