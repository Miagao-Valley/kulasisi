'use server';

import { revalidatePath } from 'next/cache';
import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function updateWord(id: number, data: FormData) {
  try {
    const promise = fetcher(
      `/dictionary/${id}/`,
      {
        method: 'PUT',
        body: data,
      },
      getToken(),
    );
    await promise;
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  revalidatePath(`dictionary/${id}`);
  return null;
}
