'use server';

import { revalidatePath } from 'next/cache';
import { fetchAPI } from '@/lib/utils/fetchAPI';
import { User } from '@/types/users';
import { ChangePhoneNumberSchema } from '../schemas/users';
import { Result } from '@/lib/utils/try-catch';

export default async function changePhoneNumber(
  username: string,
  data: ChangePhoneNumberSchema
): Promise<Result<User, any>> {
  const result = await fetchAPI(`/users/${username}/change-phone-number/`, {
    method: 'POST',
    body: JSON.stringify(data),
    authorized: true,
  });

  revalidatePath(`/users/${username}/`);

  return result;
}
