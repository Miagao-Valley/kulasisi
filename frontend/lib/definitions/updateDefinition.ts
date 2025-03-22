'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/utils/fetchAPI';
import { Definition } from '@/types/dictionary';
import { UpdateDefinitionSchema } from '../schemas/definitions';
import { Result } from '@/utils/try-catch';

export default async function updateDefinition(
  wordLang: string,
  word: string,
  id: number,
  data: UpdateDefinitionSchema
): Promise<Result<Definition, any>> {
  const result = await fetchAPI(`/dictionary/definitions/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
    authorized: true,
  });

  revalidatePath(`/dictionary/${wordLang}/${word}/`);

  return result;
}
