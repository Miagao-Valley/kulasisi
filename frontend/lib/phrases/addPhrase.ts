'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Phrase } from '@/types/phrases';
import { AddPhraseSchema } from '@/lib/schemas/phrases';
import { Result } from '@/lib/utils/try-catch';

export default async function addPhrase(
  data: AddPhraseSchema
): Promise<Result<Phrase, any>> {
  const result = await fetchAPI(`/phrases/`, {
    method: 'POST',
    body: JSON.stringify(data),
    authorized: true,
  });

  revalidatePath(`/phrases/`);

  return result;
}
