'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fetchAPI } from '@/utils/fetchAPI';

export default async function deletePhrase(id: number) {
  await fetchAPI(`/phrases/${id}/`, {
    method: 'DELETE',
    authorized: true,
  });

  revalidatePath(`/phrases/`);
  redirect(`/phrases/`);
}
