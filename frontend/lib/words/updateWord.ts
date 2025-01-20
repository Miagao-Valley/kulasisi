'use server';

import { revalidatePath } from 'next/cache';
import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function updateWord(lang: string, word: string, data: object) {
  try {
    const promise = fetcher(
      `/dictionary/${lang}/${word}/`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
      getToken(),
    );
    await promise;
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  revalidatePath(`dictionary/${lang}/${word}`);
  return null;
}
