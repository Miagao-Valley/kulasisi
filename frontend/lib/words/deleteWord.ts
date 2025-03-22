'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/utils/fetchAPI';
import { redirect } from 'next/navigation';

export default async function deleteWord(lang: string, word: string) {
  await fetchAPI(`/dictionary/${lang}/${word}/`, {
    method: 'DELETE',
    authorized: true,
  });

  revalidatePath(`/dictionary/`);
  redirect(`/dictionary`);
}
