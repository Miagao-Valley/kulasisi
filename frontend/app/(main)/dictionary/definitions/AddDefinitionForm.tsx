'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { addDefinition } from '@/lib/definitions/addDefinition';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { setFormErrors } from '@/lib/utils/setFormErrors';
import {
  addDefinitionSchema,
  AddDefinitionSchema,
} from '@/lib/schemas/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { AutosizeTextarea } from '@/components/ui/autoresize-textarea';
import { LoadingButton } from '@/components/ui/loading-button';
import { LangSelect } from '@/components/forms/LangSelect';
import { PosSelect } from '@/components/forms/PosSelect';
import { UsageNoteForm } from '@/components/forms/UsageNoteForm';
import { SourceForm } from '@/components/forms/SourceForm';
import { WordsSelect } from '@/components/forms/WordsSelect';

const FORM_DATA_KEY = 'add-definition-forms';

interface Props {
  wordLang: string;
  word: string;
  className?: string;
}

export function AddDefinitionForm({ wordLang, word, className = '' }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<AddDefinitionSchema>({
    resolver: zodResolver(addDefinitionSchema),
    defaultValues: {
      word: { word: word, lang: wordLang },
    },
  });

  useEffect(() => {
    const savedData = localStorage.getItem(FORM_DATA_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData[word]?.[wordLang]) {
        form.reset(parsedData[word][wordLang]);
      }
    }
  }, [form, word, wordLang]);

  async function onSubmit(formData: AddDefinitionSchema) {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.');
      router.push(`/login?next=${pathname}`);
      return;
    }

    const { data, error } = await addDefinition(formData);
    if (error) {
      setFormErrors(error, form.setError);
    } else {
      toast.success('Definition added');
      const savedData = JSON.parse(localStorage.getItem(FORM_DATA_KEY) || '{}');
      if (savedData[word]) {
        delete savedData[word][wordLang];
        if (Object.keys(savedData[word]).length === 0) {
          delete savedData[word];
        }
      }
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(savedData));
    }
    return { data, error };
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      const savedData = JSON.parse(localStorage.getItem(FORM_DATA_KEY) || '{}');
      if (!savedData[word]) {
        savedData[word] = {};
      }
      savedData[word][wordLang] = value;
      localStorage.setItem(FORM_DATA_KEY, JSON.stringify(savedData));
    });

    return () => subscription.unsubscribe();
  }, [form, word, wordLang]);

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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutosizeTextarea
                  className="p-1 text-xl resize-none borderless-input"
                  placeholder="Enter your definition"
                  {...field}
                />
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
                        error={form.formState.errors?.lang?.message}
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
              name="pos"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PosSelect
                      selectedPos={field.value}
                      setSelectedPos={(value) => form.setValue('pos', value)}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="synonyms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <WordsSelect
                      selectedWords={field.value}
                      setSelectedWords={(value) =>
                        form.setValue('synonyms', value)
                      }
                      exclude={[word, ...(form.watch('antonyms') || [])]}
                      lang={form.watch('lang')}
                      placeholder="synonyms..."
                      disabled={!form.watch('lang')}
                      error={form.formState.errors?.synonyms?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="antonyms"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <WordsSelect
                      selectedWords={field.value}
                      setSelectedWords={(value) =>
                        form.setValue('antonyms', value)
                      }
                      exclude={[word, ...(form.watch('synonyms') || [])]}
                      lang={form.watch('lang')}
                      placeholder="antonyms..."
                      disabled={!form.watch('lang')}
                      error={form.formState.errors?.antonyms?.message}
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
            Add
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
