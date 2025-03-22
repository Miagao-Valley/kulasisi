'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import addPhrase from '@/lib/phrases/addPhrase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import { addPhraseSchema, AddPhraseSchema } from '@/lib/schemas/phrases';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditorProvider } from '@/components/editor/EditorContext';
import Editor from '@/components/editor/Editor';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { LoadingButton } from '@/components/ui/loading-button';
import LangSelect from '@/components/forms/LangSelect';
import UsageNoteForm from '@/components/forms/UsageNoteForm';
import SourceForm from '@/components/forms/SourceForm';
import CategoriesSelect from '@/components/forms/CategoriesSelect';

const FORM_DATA_KEY = 'add-phrase-form';

interface Props {
  className?: string;
}

export default function AddPhraseForm({ className = '' }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<AddPhraseSchema>({
    mode: 'onTouched',
    resolver: zodResolver(addPhraseSchema),
  });

  useEffect(() => {
    const savedData = localStorage.getItem(FORM_DATA_KEY);
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [form]);

  async function onSubmit(formData: AddPhraseSchema) {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.');
      router.push(`/login?next=${pathname}`);
      return;
    }

    const { data, error } = await addPhrase(formData);
    if (error) {
      setFormErrors(error, form.setError);
    } else if (data) {
      router.push(`/phrases/${data.id}/`);
      toast.success('Phrase added');
    }

    localStorage.removeItem(FORM_DATA_KEY);

    return { data, error };
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <EditorProvider lang={form.watch('lang')}>
                  <Editor
                    placeholder="Enter a phrase"
                    value={field.value}
                    onValueChange={(value) => form.setValue('content', value)}
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
              <FormField
                control={form.control}
                name="lang"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <LangSelect
                        selectedLang={field.value}
                        setSelectedLang={(value) =>
                          form.setValue('lang', value)
                        }
                        error={form.formState.errors.lang?.message}
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
                      error={form.formState.errors.categories?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <LoadingButton
            className="ms-auto w-full sm:w-fit"
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Post
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
