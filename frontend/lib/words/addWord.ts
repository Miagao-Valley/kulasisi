'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/utils/fetchAPI';
import { Word } from '@/types/dictionary';
import { AddWordSchema } from '@/lib/schemas/words';
import { Result } from '@/utils/try-catch';

export default async function addWord(
  data: AddWordSchema
): Promise<Result<Word, any>> {
  const result = await fetchAPI(`/dictionary/`, {
    method: 'POST',
    body: JSON.stringify(data),
    authorized: true,
  });

  revalidatePath(`/dictionary/`);

  return result;
}
