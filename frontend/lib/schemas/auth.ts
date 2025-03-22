import { z } from 'zod';
import { Gender } from '@/types/users';
import { LangProficiencyLevel } from '@/types/languages';

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(150, 'Username must be 150 characters or fewer')
    .regex(
      /^[\w.@+-]+$/,
      'Username can only contain letters, digits, and @/./+/-/_'
    ),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(128, 'Password must be 128 characters or fewer'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(150, 'Username must be 150 characters or fewer')
    .regex(
      /^[\w.@+-]+$/,
      'Username can only contain letters, digits, and @/./+/-/_'
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(128, 'Password must be 128 characters or fewer'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone_number: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits')
    .optional(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  date_of_birth: z.date(),
  location: z.string().min(1, 'Location is required'),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: 'Invalid gender selection' }),
  }),
  language_proficiencies: z.array(
    z.object({
      lang: z.string(),
      level: z.nativeEnum(LangProficiencyLevel, {
        errorMap: () => ({ message: 'Invalid level' }),
      }),
    })
  ),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
