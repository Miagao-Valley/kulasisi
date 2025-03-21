'use client';

import React from 'react';
import updateTranslation from '@/lib/translations/updateTranslation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Translation } from '@/types/phrases';
import { EditorProvider } from '@/components/editor/EditorContext';
import Editor from '@/components/editor/Editor';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import SourceForm from '@/components/forms/SourceForm';

export const updateTranslationSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

export type UpdateTranslationSchema = z.infer<typeof updateTranslationSchema>;

interface Props {
  translation: Translation;
  initialContent?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdateTranslationForm({
  translation,
  setIsEditing,
  className = '',
}: Props) {
  const form = useForm<UpdateTranslationSchema>({
    resolver: zodResolver(updateTranslationSchema),
    defaultValues: {
      content: translation.content || '',
      source_title: translation.source_title || '',
      source_link: translation.source_link || '',
    },
  });

  async function onSubmit(data: UpdateTranslationSchema) {
    const res = await updateTranslation(
      translation.phrase,
      translation.id,
      data
    );
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

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <EditorProvider lang={translation.lang}>
                  <Editor
                    placeholder="Enter updated translation"
                    autoFocus
                    value={field.value}
                    onValueChange={(value) => form.setValue('content', value)}
                    className="bg-transparent"
                  />
                </EditorProvider>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
