'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fetcher from '@/utils/fetcher';
import getToken from '../tokens/getToken';

export default async function deleteTranslation(
  dictEntryId: number,
  id: number,
) {
  await fetcher(
    `/definitions/${id}/`,
    {
      method: 'DELETE',
    },
    getToken(),
  );

  revalidatePath(`/dictionary/${dictEntryId}`);
  redirect(`/dictionary/${dictEntryId}`);
}
