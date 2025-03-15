'use client';

import React from 'react';
import updateWord from '@/lib/words/updateWord';
import { Word } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm, SubmitHandler } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import { Form, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import SourceForm from '@/components/forms/SourceForm';
import { Input } from '@/components/ui/input';

export interface WordInputs {
  source_title: string;
  source_link: string;
}

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
  const form = useForm<WordInputs>();
  const onSubmit: SubmitHandler<WordInputs> = async (data: WordInputs) => {
    const res = await updateWord(word.lang, word.word, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      setIsEditing(false);
      toast.success('Entry updated');
    }
    return res;
  };

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
          <SourceForm
            form={form}
            defaultSourceTitle={word.source_title}
            defaultSourceLink={word.source_link}
          />

          <div className="ms-auto flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Save
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
