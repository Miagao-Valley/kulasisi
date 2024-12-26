'use server';

import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import { redirect } from 'next/navigation';
import getToken from '../tokens/getToken';

export default async function deletePhrase(id: number) {
  await fetcher(
    `/phrases/${id}/`,
    {
      method: 'DELETE',
    },
    getToken(),
  );

  revalidatePath(`/phrases`);
  redirect(`/phrases`);
}
