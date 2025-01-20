'use server';

import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import { redirect } from 'next/navigation';
import getToken from '../tokens/getToken';

export default async function deleteWord(lang: string, word: string) {
  await fetcher(
    `/dictionary/${lang}/${word}/`,
    {
      method: 'DELETE',
    },
    getToken(),
  );

  revalidatePath(`/dictionary`);
  redirect(`/dictionary`);
}
