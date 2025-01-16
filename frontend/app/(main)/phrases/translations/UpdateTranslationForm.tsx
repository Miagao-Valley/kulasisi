'use client';

import React from 'react';
import updateTranslation from '@/lib/translations/updateTranslation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm, SubmitHandler } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import { Translation } from '@/types/phrases';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { AutosizeTextarea } from '@/components/ui/autoresize-textarea';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import SourceForm from '@/components/SourceForm';

export interface TranslationInputs {
  content: string;
  source_title: string;
  source_link: string;
}

interface Props {
  translation: Translation;
  initialContent?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdateTranslationForm({
  translation,
  initialContent = '',
  setIsEditing,
  className = '',
}: Props) {
  const form = useForm<TranslationInputs>();
  const onSubmit: SubmitHandler<TranslationInputs> = async (
    data: TranslationInputs,
  ) => {
    const res = await updateTranslation(translation.phrase, translation.id, data);
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

        <FormField
          control={form.control}
          name="content"
          defaultValue={initialContent}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutosizeTextarea
                  className="p-1 text-base resize-none borderless-input bg-transparent"
                  placeholder="Enter updated translation"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-0 items-center">
          <SourceForm
            form={form}
            defaultSourceTitle={translation.source_title}
            defaultSourceLink={translation.source_link}
          />

          <div className="ms-auto flex justify-end gap-2">
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
        </div>
      </form>
    </Form>
  );
}
