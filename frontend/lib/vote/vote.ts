'use server';

import fetcher, { FetchError } from '@/utils/fetcher';
import { Entry } from '@/types/core';
import getToken from '../tokens/getToken';
import { revalidatePath } from 'next/cache';
import entryToUrl from '../../utils/entryToUrl';

export default async function vote(
  entry: Entry,
  value: -1 | 0 | 1,
) {
  const url = entryToUrl(entry);
  const frontendUrl = entryToUrl(entry, false);
  let res = null;
  try {
    res = await fetcher(
      `${url}votes/`,
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

  revalidatePath(frontendUrl);

  return res;
}
