'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/utils/fetchAPI';
import { User } from '@/types/users';
import { UpdateUserSchema } from '../schemas/users';
import { Result } from '@/utils/try-catch';

export default async function updateUser(
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
