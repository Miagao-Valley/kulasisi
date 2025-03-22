'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/utils/fetchAPI';
import { Phrase } from '@/types/phrases';
import { UpdatePhraseSchema } from '@/lib/schemas/phrases';
import { Result } from '@/utils/try-catch';

export default async function updatePhrase(
  id: number,
  data: UpdatePhraseSchema
): Promise<Result<Phrase, any>> {
  const result = await fetchAPI(`/phrases/${id}/`, {
    method: 'PUT',
    authorized: true,
    body: JSON.stringify(data),
  });

  revalidatePath(`/phrases/${id}/`);

  return result;
}
