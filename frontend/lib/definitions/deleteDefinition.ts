'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function deleteTranslation(
  wordId: number,
  id: number,
) {
  await fetcher(
    `/dictionary/definitions/${id}/`,
    {
      method: 'DELETE',
    },
    getToken(),
  );

  revalidatePath(`/dictionary/${wordId}`);
  redirect(`/dictionary/${wordId}`);
}
