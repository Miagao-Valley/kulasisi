'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Translation } from '@/types/phrases';
import { AddTranslationSchema } from '@/lib/schemas/translations';
import { Result } from '@/lib/utils/try-catch';

export async function addTranslation(
  data: AddTranslationSchema
): Promise<Result<Translation, any>> {
  const result = await fetchAPI(`/phrases/translations/`, {
    method: 'POST',
    authorized: true,
    body: JSON.stringify(data),
  });

  revalidatePath(`/phrases/${data.phrase}/`);

  return result;
}
