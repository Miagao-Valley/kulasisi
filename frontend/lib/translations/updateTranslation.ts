'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { Translation } from '@/types/phrases';
import { UpdateTranslationSchema } from '@/lib/schemas/translations';
import { Result } from '@/lib/utils/try-catch';

export default async function updateTranslation(
  phraseId: number,
  id: number,
  data: UpdateTranslationSchema
): Promise<Result<Translation, any>> {
  const result = await fetchAPI(`/phrases/translations/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
    authorized: true,
  });

  revalidatePath(`/phrases/${phraseId}/`);

  return result;
}
