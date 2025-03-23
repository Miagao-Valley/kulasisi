'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { User } from '@/types/users';
import { UpdateUserSchema } from '../schemas/users';
import { Result } from '@/lib/utils/try-catch';

export async function updateUser(
  username: string,
  data: UpdateUserSchema
): Promise<Result<User, any>> {
  const result = await fetchAPI(`/users/${username}/update/`, {
    method: 'PATCH',
    authorized: true,
    body: JSON.stringify(data),
  });

  revalidatePath(`/users/`);
  revalidatePath(`/users/${username}/`);

  return result;
}
