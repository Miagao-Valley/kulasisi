'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import login from './login';
import { RegisterSchema } from '@/lib/schemas/auth';
import { Result } from '@/lib/utils/try-catch';
import { User } from '@/types/users';

export default async function register(
  data: RegisterSchema
): Promise<Result<User, any>> {
  const result = await fetchAPI(`/register/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (result.error) {
    return result;
  }

  revalidatePath(`/users/`);
  revalidatePath(`/`);

  await login({
    username: result.data.username,
    password: result.data.password,
  });

  return result;
}
