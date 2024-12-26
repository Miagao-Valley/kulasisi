'use server';

import fetcher, { FetchError } from '@/utils/fetcher';
import getToken from '../tokens/getToken';
import { revalidatePath } from 'next/cache';
import getTranslation from '../translations/getTranslation';

export default async function vote(
  id: number,
  type: 'phrases' | 'translations' | 'words' | 'definitions',
  value: -1 | 0 | 1,
) {
  let res = null;
  try {
    res = await fetcher(
      `/${type}/${id}/votes/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: value }),
      },
      getToken(),
    );
  } catch (error) {
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  if (type === 'translations') {
    const translation = await getTranslation(id);
    revalidatePath(`/phrases/${translation.id}/`);
  } else if (type === 'phrases') {
    revalidatePath(`/phrases/${id}/`);
  } else if (type === 'words') {
    revalidatePath(`/dictionary/${id}/`);
  }

  return res;
}
