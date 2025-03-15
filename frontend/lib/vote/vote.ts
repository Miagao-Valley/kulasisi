'use server';

import fetcher, { FetchError } from '@/utils/fetcher';
import { Entry, Vote } from '@/types/core';
import getToken from '../tokens/getToken';
import { revalidatePath } from 'next/cache';
import entryToUrl from '../../utils/entryToUrl';

export default async function vote(entry: Entry, value: Vote['value']) {
  const backendUrl = entryToUrl(entry);
  const frontendUrl = entryToUrl(entry, false);
  if (backendUrl === '' || frontendUrl === '') {
    console.error('Failed to get entry URL');
  }

  let res = null;
  try {
    res = await fetcher(
      `/${backendUrl}/votes/`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: value }),
      },
      getToken()
    );
  } catch (error) {
    revalidatePath(frontendUrl);
    const fetchError = error as FetchError;
    return { error: fetchError.resBody };
  }

  revalidatePath(frontendUrl);

  return res;
}
