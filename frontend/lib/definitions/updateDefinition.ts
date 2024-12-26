'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function updateDefinition(
  dictEntryId: number,
  id: number,
  data: FormData,
) {
  try {
    const promise = fetcher(
      `/definitions/${id}/`,
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

  revalidatePath(`/dictionary/${dictEntryId}`);
  redirect(`/dictionary/${dictEntryId}`);
}