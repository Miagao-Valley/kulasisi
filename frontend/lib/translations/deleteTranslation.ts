'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function deleteTranslation(
  textEntryId: number,
  id: number,
) {
  await fetcher(
    `/translations/${id}/`,
    {
      method: 'DELETE',
    },
    getToken(),
  );

  revalidatePath(`/posts/${textEntryId}`);
  redirect(`/posts/${textEntryId}`);
}
