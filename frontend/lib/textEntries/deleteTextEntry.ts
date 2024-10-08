'use server';

import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import { redirect } from 'next/navigation';
import getToken from '../tokens/getToken';

export default async function deleteTextEntry(id: number): Promise<Response> {
  const res = await fetcher(
    `/text-entries/${id}/`,
    {
      method: 'DELETE',
    },
    getToken()
  );

  revalidatePath(`/posts`);

  if (!res.ok) {
    return res;
  }

  redirect(`/posts`);
}
