import { z } from 'zod';
import { Gender } from '@/types/users';
import { LangProficiencyLevel } from '@/types/languages';

export const updateUserSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  date_of_birth: z.date(),
  location: z.string().min(1, 'Location name is required'),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: 'Invalid gender selection' }),
  }),
  bio: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const langProficienciesSchema = z.object({
  language_proficiencies: z.array(
    z.object({
      lang: z.string(),
      level: z.nativeEnum(LangProficiencyLevel, {
        errorMap: () => ({ message: 'Invalid level' }),
      }),
    })
  ),
});

export type LangProficienciesSchema = z.infer<typeof langProficienciesSchema>;

export const changeEmailSchema = z.object({
  new_email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
});

export type ChangeEmailSchema = z.infer<typeof changeEmailSchema>;

export const changePhoneNumberSchema = z.object({
  new_phone_number: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  password: z.string().min(1, 'Password is required'),
});

export type ChangePhoneNumberSchema = z.infer<typeof changePhoneNumberSchema>;

export const changePasswordSchema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(128, 'Password must be 128 characters or fewer'),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const deleteUserSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .regex(
      /^[\w.@+-]+$/,
      'Username can only contain letters, digits, and @/./+/-/_'
    ),
  password: z.string().min(1, 'Password is required'),
});

export type DeleteUserSchema = z.infer<typeof deleteUserSchema>;
