'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function deleteDefinition(
  wordLang: string,
  word: string,
  id: number,
) {
  await fetcher(
    `/dictionary/definitions/${id}/`,
    {
      method: 'DELETE',
    },
    getToken(),
  );

  revalidatePath(`/dictionary/${wordLang}/${word}`);
  redirect(`/dictionary/${wordLang}/${word}`);
}
