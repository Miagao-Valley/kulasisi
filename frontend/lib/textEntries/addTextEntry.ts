'use server';

import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';

export default async function addText(data: FormData) {
  const res = await fetcher(`text-entries/`, {
    method: 'POST',
    body: data,
  });

  revalidatePath(`/posts`);
}