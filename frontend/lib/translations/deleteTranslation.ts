'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';

export default async function deleteTranslation(phraseId: number, id: number) {
  await fetchAPI(`/phrases/translations/${id}/`, {
    method: 'DELETE',
    authorized: true,
  });

  revalidatePath(`/phrases/${phraseId}/`);
  redirect(`/phrases/${phraseId}/`);
}
