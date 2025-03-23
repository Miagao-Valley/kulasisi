'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Entry, VoteValue } from '@/types/core';
import { entryToPath } from '@/lib/utils/entryToPath';

export async function vote(entry: Entry, value: VoteValue) {
  const backendPath = entryToPath(entry);
  const frontendPath = entryToPath(entry, false);

  const result = await fetchAPI(`/${backendPath}/votes/`, {
    method: 'POST',
    authorized: true,
    body: JSON.stringify({ value }),
  });

  revalidatePath(frontendPath);

  return result;
}
