'use server';

import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import { redirect } from 'next/navigation';

export default async function deleteTextEntry(id: number): Promise<void> {
  const res = await fetcher(`text-entries/${id}/`, {
    method: 'DELETE',
  });

  revalidatePath(`/posts`);
  redirect(`/posts`);
}
