'use client';

import React from 'react';
import updatePhrase from '@/lib/phrases/updatePhrase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import { updatePhraseSchema, UpdatePhraseSchema } from '@/lib/schemas/phrases';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phrase } from '@/types/phrases';
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
import UsageNoteForm from '@/components/forms/UsageNoteForm';
import SourceForm from '@/components/forms/SourceForm';
import CategoriesSelect from '@/components/forms/CategoriesSelect';

interface Props {
  phrase: Phrase;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdatePhraseForm({
  phrase,
  setIsEditing,
  className = '',
}: Props) {
  const form = useForm<UpdatePhraseSchema>({
    resolver: zodResolver(updatePhraseSchema),
    defaultValues: {
      content: phrase.content || '',
      categories: phrase.categories || [],
      usage_note: phrase.usage_note || '',
      source_title: phrase.source_title || '',
      source_link: phrase.source_link || '',
    },
  });

  async function onSubmit(formData: UpdatePhraseSchema) {
    const { data, error } = await updatePhrase(phrase.id, formData);
    if (error) {
      setFormErrors(error, form.setError);
    } else {
      setIsEditing(false);
      toast.success('Phrase updated');
    }

    return { data, error };
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
                <EditorProvider lang={phrase.lang}>
                  <Editor
                    placeholder="Enter updated phrase"
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

        <div className="flex flex-col sm:flex-row gap-1 items-center">
          <div className="w-full sm:w-fit flex gap-0 justify-between items-center">
            <div className="flex gap-0 items-center">
              <UsageNoteForm form={form} />
              <SourceForm form={form} />
            </div>
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CategoriesSelect
                      selectedCategories={field.value}
                      setSelectedCategories={(value) =>
                        form.setValue('categories', value)
                      }
                      error={form.formState.errors?.categories?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

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
