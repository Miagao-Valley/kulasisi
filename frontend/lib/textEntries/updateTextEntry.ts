'use server';

import fetcher from '@/utils/fetcher';
import { revalidatePath } from 'next/cache';
import getToken from '../tokens/getToken';

export default async function updateTextEntry(
  id: number,
  data: FormData
): Promise<Response> {
  const res = await fetcher(
    `/text-entries/${id}/`,
    {
      method: 'PUT',
      body: data,
    },
    getToken()
  );

  revalidatePath(`posts/${id}`);

  return res;
}
