'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { User } from '@/types/users';
import { ChangeEmailSchema } from '../schemas/users';
import { Result } from '@/lib/utils/try-catch';

export async function changeEmail(
  username: string,
  data: ChangeEmailSchema
): Promise<Result<User, any>> {
  const result = await fetchAPI(`/users/${username}/change-email/`, {
    method: 'POST',
    body: JSON.stringify(data),
    authorized: true,
  });

  revalidatePath(`/users/${username}/`);

  return result;
}
