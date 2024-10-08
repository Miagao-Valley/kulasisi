'use server';

import fetcher from '@/utils/fetcher';
import { revalidatePath } from 'next/cache';

export default async function updateTextEntry(
  id: number,
  data: FormData
): Promise<Response> {
  const res = await fetcher(`/text-entries/${id}/`, {
    method: 'PUT',
    body: data,
  });

  revalidatePath(`posts/${id}`);

  return res;
}
