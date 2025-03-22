import { z } from 'zod';

export const addPhraseSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  lang: z.string().min(1, 'Language is required'),
  categories: z.array(z.string()).optional(),
  usage_note: z.string().optional(),
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

export type AddPhraseSchema = z.infer<typeof addPhraseSchema>;

export const updatePhraseSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  categories: z.array(z.string()).optional(),
  usage_note: z.string().optional(),
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

export type UpdatePhraseSchema = z.infer<typeof updatePhraseSchema>;
