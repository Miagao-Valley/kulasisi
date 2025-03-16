'use server';

import path from 'path';
import { revalidatePath } from 'next/cache';
import fetcher, { FetchError } from '@/utils/fetcher';
import { Entry, Vote } from '@/types/core';
import getToken from '../tokens/getToken';
import entryToUrl from '../../utils/entryToUrl';

export default async function vote(entry: Entry, value: Vote['value']) {
  const backendUrl = entryToUrl(entry);
  const frontendUrl = entryToUrl(entry, false);

  if (!backendUrl || !frontendUrl) {
    console.error('Failed to generate valid entry URLs:', {
      backendUrl,
      frontendUrl,
    });
    throw new Error('Invalid entry URL');
  }

  const voteUrl = path.join('/', backendUrl, 'votes', '/');
  let result;

  try {
    result = await fetcher(
      voteUrl,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      },
      getToken()
    );
  } catch (error) {
    result = {
      error: (error as FetchError).resBody ?? 'Unexpected fetch error',
    };
  } finally {
    revalidatePath(frontendUrl);
  }

  return result;
}
