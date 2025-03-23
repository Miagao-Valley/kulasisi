'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { addTranslation } from '@/lib/translations/addTranslation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { setFormErrors } from '@/lib/utils/setFormErrors';
import {
  addTranslationSchema,
  AddTranslationSchema,
} from '@/lib/schemas/translations';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditorProvider } from '@/components/editor/EditorContext';
import { Editor } from '@/components/editor/Editor';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { LoadingButton } from '@/components/ui/loading-button';
import { LangSelect } from '@/components/forms/LangSelect';
import { SourceForm } from '@/components/forms/SourceForm';

const FORM_DATA_KEY = 'add-translation-forms';

interface Props {
  phraseId: number;
  originalLang: string;
  className?: string;
}

export function AddTranslationForm({
  phraseId,
  originalLang,
  className = '',
}: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<AddTranslationSchema>({
    resolver: zodResolver(addTranslationSchema),
    defaultValues: {
      phrase: phraseId,
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem(FORM_DATA_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData[phraseId]) {
        form.reset(parsedData[phraseId]);
      }
    }
  }, [form, phraseId]);

  async function onSubmit(formData: AddTranslationSchema) {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.');
      router.push(`/login?next=${pathname}`);
      return;
    }

    const { data, error } = await addTranslation(formData);
    if (error) {
      setFormErrors(error, form.setError);
    } else {
      toast.success('Translation added');
      const savedData = JSON.parse(localStorage.getItem(FORM_DATA_KEY) || '{}');
      delete savedData[phraseId];
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(savedData));
    }
    return { data, error };
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      const savedData = JSON.parse(localStorage.getItem(FORM_DATA_KEY) || '{}');
      savedData[phraseId] = value;
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(savedData));
    });

    return () => subscription.unsubscribe();
  }, [form, phraseId]);

  return (
    <Form {...form}>
      <form
        className={cn(className, 'flex flex-col gap-3')}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormMessage>
          {form.formState.errors.root?.serverError?.message}
        </FormMessage>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <EditorProvider lang={form.watch('lang')}>
                  <Editor
                    placeholder="Enter your translation"
                    value={field.value}
                    onValueChange={(value) => form.setValue('content', value)}
                  />
                </EditorProvider>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-0 items-center">
          <FormField
            control={form.control}
            name="lang"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LangSelect
                    selectedLang={field.value}
                    setSelectedLang={(value) => form.setValue('lang', value)}
                    exclude={[originalLang]}
                    error={form.formState.errors?.lang?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <SourceForm form={form} />

          <LoadingButton
            className="ms-auto"
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Add
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
