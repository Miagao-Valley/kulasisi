'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function updateDefinition(
  wordLang: string,
  word: string,
  id: number,
  data: object,
) {
  try {
    const promise = fetcher(
      `/dictionary/definitions/${id}/`,
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

  revalidatePath(`/dictionary/${wordLang}/${word}`);
  redirect(`/dictionary/${wordLang}/${word}`);
}
