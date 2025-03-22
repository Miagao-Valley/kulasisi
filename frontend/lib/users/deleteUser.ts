'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/utils/fetchAPI';
import { User } from '@/types/users';
import { DeleteUserSchema } from '../schemas/users';
import { Result } from '@/utils/try-catch';

export default async function deleteUser(
  username: string,
  data: DeleteUserSchema
): Promise<Result<User, any>> {
  const result = await fetchAPI(`/users/${username}/delete/`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    authorized: true,
  });

  revalidatePath(`/users/`);

  return result;
}
