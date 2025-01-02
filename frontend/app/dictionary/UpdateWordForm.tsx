'use client';

import React from 'react';
import updateWord from '@/lib/words/updateWord';
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

export interface WordInputs {
  word: string;
}

interface Props {
  id: number;
  initialWord?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdateWordForm({
  id,
  initialWord = '',
  setIsEditing,
  className = '',
}: Props) {
  const form = useForm<WordInputs>();
  const onSubmit: SubmitHandler<WordInputs> = async (data: WordInputs) => {
    const res = await updateWord(id, data);
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
          defaultValue={initialWord}
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

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={
              !form.watch('word')?.trim() ||
              form.watch('word')?.trim() == initialWord
            }
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
