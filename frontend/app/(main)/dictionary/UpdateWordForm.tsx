'use client';

import React from 'react';
import updateWord from '@/lib/words/updateWord';
import { Word } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm, SubmitHandler } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import SourceForm from '@/components/SourceForm';

export interface WordInputs {
  word: string;
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
    const res = await updateWord(word.id, data);
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
        className={cn(className, 'flex flex-col gap-3')}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormMessage>
          {form.formState.errors.root?.serverError.message}
        </FormMessage>

        <FormField
          control={form.control}
          name="word"
          defaultValue={word.word}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="p-0 !text-xl font-bold borderless-input"
                  type="text"
                  placeholder="Enter updated word"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-2 items-center">
          <SourceForm
            form={form}
            defaultSourceTitle={word.source_title}
            defaultSourceLink={word.source_link}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
