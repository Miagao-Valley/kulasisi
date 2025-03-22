import { z } from 'zod';

export const addWordSchema = z.object({
  word: z.string().min(1, 'Word is required'),
  lang: z.string().min(1, 'Language is required'),
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

export type AddWordSchema = z.infer<typeof addWordSchema>;

export const updateWordSchema = z.object({
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

export type UpdateWordSchema = z.infer<typeof updateWordSchema>;
