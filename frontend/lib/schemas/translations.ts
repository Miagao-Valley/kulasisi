import { z } from 'zod';

export const addTranslationSchema = z.object({
  phrase: z.number(),
  content: z.string().min(1, 'Content is required'),
  lang: z.string().min(1, 'Language is required'),
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

export type AddTranslationSchema = z.infer<typeof addTranslationSchema>;

export const updateTranslationSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

export type UpdateTranslationSchema = z.infer<typeof updateTranslationSchema>;
