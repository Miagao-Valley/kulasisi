'use server';

import { revalidatePath } from 'next/cache';
import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function addDefinition(
  dictEntryId: number,
  data: FormData,
) {
  let res = null;
  try {
    res = await fetcher(
      `/definitions/`,
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

  revalidatePath(`/dictionary/${dictEntryId}/`);
  return res;
}
