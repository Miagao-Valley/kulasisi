'use client';

import React from 'react';
import updatePhrase from '@/lib/phrases/updatePhrase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm, SubmitHandler } from "react-hook-form"
import setFormErrors from '@/utils/setFormErrors';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { AutosizeTextarea } from '@/components/ui/autoresize-textarea';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';

export interface PhraseInputs {
  content: string;
}

interface Props {
  id: number;
  initialContent?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdatePhraseForm({
  id,
  initialContent = '',
  setIsEditing,
  className = '',
}: Props) {
  const form = useForm<PhraseInputs>()
  const onSubmit: SubmitHandler<PhraseInputs> = async (data: PhraseInputs) => {
    const res = await updatePhrase(id, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError)
    } else {
      setIsEditing(false);
      toast.success('Entry updated');
    }
    return res;
  };

  return (
    <Form {...form}>
      <form className={cn(className, 'flex flex-col gap-3')} onSubmit={form.handleSubmit(onSubmit)}>
        <FormMessage>
            {form.formState.errors.root?.serverError.message}
        </FormMessage>

        <FormField
          control={form.control}
          name="content"
          defaultValue={initialContent}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutosizeTextarea
                  className="p-1 text-base resize-none borderless-input"
                  placeholder="Enter updated phrase"
                  minHeight={24}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={!form.watch("content")?.trim() || form.watch("content")?.trim() == initialContent}
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
