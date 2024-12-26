'use server';

import { revalidatePath } from 'next/cache';
import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function updatePhrase(id: number, data: FormData) {
  try {
    const promise = fetcher(
      `/phrases/${id}/`,
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

  revalidatePath(`phrases/${id}`);
  return null;
}