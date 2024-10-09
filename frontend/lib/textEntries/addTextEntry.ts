'use server';

import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function addText(data: FormData): Promise<Response> {
  const res = await fetcher(
    `/text-entries/`,
    {
      method: 'POST',
      body: data,
    },
    getToken()
  );

  revalidatePath(`/posts`);

  return res;
}
