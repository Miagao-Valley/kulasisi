import { z } from 'zod';

export const addDefinitionSchema = z.object({
  word: z.object({
    word: z.string(),
    lang: z.string(),
  }),
  description: z.string().min(1, 'Description is required'),
  lang: z.string().min(1, 'Language is required'),
  pos: z.string().optional(),
  synonyms: z.array(z.string()).optional(),
  antonyms: z.array(z.string()).optional(),
  usage_note: z.string().optional(),
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

export type AddDefinitionSchema = z.infer<typeof addDefinitionSchema>;

export const updateDefinitionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  pos: z.string().optional(),
  synonyms: z.array(z.string()).optional(),
  antonyms: z.array(z.string()).optional(),
  usage_note: z.string().optional(),
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

export type UpdateDefinitionSchema = z.infer<typeof updateDefinitionSchema>;
