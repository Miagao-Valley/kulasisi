'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Definition } from '@/types/dictionary';
import { AddDefinitionSchema } from '@/lib/schemas/definitions';
import { Result } from '@/lib/utils/try-catch';

export default async function addDefinition(
  data: AddDefinitionSchema
): Promise<Result<Definition, any>> {
  const result = await fetchAPI(`/dictionary/definitions/`, {
    method: 'POST',
    body: JSON.stringify(data),
    authorized: true,
  });

  revalidatePath(`/dictionary/${data.word.lang}/${data.word.word}/`);

  return result;
}
