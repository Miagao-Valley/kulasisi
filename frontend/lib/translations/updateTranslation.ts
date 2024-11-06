'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function updateTranslation(
  textEntryId: number,
  id: number,
  data: FormData
) {
  try {
    const promise = fetcher(
      `/translations/${id}/`,
      {
        method: 'PUT',
        body: data,
      },
      getToken()
    );
    await promise;
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  revalidatePath(`/posts/${textEntryId}`);
  redirect(`/posts/${textEntryId}`);
}
