'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function deleteTranslation(
  phraseEntryId: number,
  id: number,
) {
  await fetcher(
    `/translations/${id}/`,
    {
      method: 'DELETE',
    },
    getToken(),
  );

  revalidatePath(`/phrases/${phraseEntryId}`);
  redirect(`/phrases/${phraseEntryId}`);
}
