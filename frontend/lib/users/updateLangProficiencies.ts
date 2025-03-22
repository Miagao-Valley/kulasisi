'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { User } from '@/types/users';
import { LangProficienciesSchema } from '../schemas/users';
import { Result } from '@/lib/utils/try-catch';

export default async function updateLangProficiencies(
  username: string,
  data: LangProficienciesSchema
): Promise<Result<User, any>> {
  const result = await fetchAPI(`/users/${username}/update/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    authorized: true,
  });

  revalidatePath(`/users/`);
  revalidatePath(`/users/${username}/`);
  return result;
}
