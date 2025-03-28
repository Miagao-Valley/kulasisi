'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Word } from '@/types/dictionary';
import { UpdateWordSchema } from '@/lib/schemas/words';
import { Result } from '@/lib/utils/try-catch';

export async function updateWord(
  lang: string,
  word: string,
  data: UpdateWordSchema
): Promise<Result<Word, any>> {
  const result = await fetchAPI(`/dictionary/${lang}/${word}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
    authorized: true,
  });

  revalidatePath(`dictionary/${lang}/${word}/`);

  return result;
}
