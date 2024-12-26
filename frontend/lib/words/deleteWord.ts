'use server';

import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import { redirect } from 'next/navigation';
import getToken from '../tokens/getToken';

export default async function deleteWord(id: number) {
  await fetcher(
    `/dictionary/${id}/`,
    {
      method: 'DELETE',
    },
    getToken(),
  );

  revalidatePath(`/dictionary`);
  redirect(`/dictionary`);
}
