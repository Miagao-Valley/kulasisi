'use client';

import React from 'react';
import updateWord from '@/lib/words/updateWord';
import { Word } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import SourceForm from '@/components/forms/SourceForm';
import { Input } from '@/components/ui/input';

export const updateWordSchema = z.object({
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

export type UpdateWordSchema = z.infer<typeof updateWordSchema>;

interface Props {
  word: Word;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdateWordForm({
  word,
  setIsEditing,
  className = '',
}: Props) {
  const form = useForm<UpdateWordSchema>({
    resolver: zodResolver(updateWordSchema),
    defaultValues: {
      source_title: word.source_title || '',
      source_link: word.source_link || '',
    },
  });

  async function onSubmit(data: UpdateWordSchema) {
    const res = await updateWord(word.lang, word.word, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      setIsEditing(false);
      toast.success('Entry updated');
    }
    return res;
  }

  return (
    <Form {...form}>
      <form
        className={cn(className, 'flex flex-col gap-0')}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormMessage>
          {form.formState.errors.root?.serverError.message}
        </FormMessage>

        <Input
          type="text"
          className="p-0 !text-xl font-bold borderless-input bg-transparent"
          value={word.word}
          disabled
        />

        <div className="flex gap-0 items-center">
          <SourceForm form={form} />

          <div className="ms-auto w-full sm:w-fit flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full sm:w-fit bg-transparent"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              size="sm"
              className="w-full sm:w-fit"
              loading={form.formState.isSubmitting}
            >
              Save
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
