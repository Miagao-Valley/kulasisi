'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';

export async function deleteDefinition(
  wordLang: string,
  word: string,
  id: number
) {
  await fetchAPI(`/dictionary/definitions/${id}/`, {
    method: 'DELETE',
    authorized: true,
  });

  revalidatePath(`/dictionary/${wordLang}/${word}/`);
  redirect(`/dictionary/${wordLang}/${word}/`);
}
