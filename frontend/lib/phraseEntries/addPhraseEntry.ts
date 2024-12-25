'use server';

import { revalidatePath } from 'next/cache';
import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function addPhraseEntry(data: FormData) {
  let res = null;
  try {
    res = await fetcher(
      `/phrase-entries/`,
      {
        method: 'POST',
        body: data,
      },
      getToken(),
    );
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  revalidatePath(`/phrases`);
  return res;
}
