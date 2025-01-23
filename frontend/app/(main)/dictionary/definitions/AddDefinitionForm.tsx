'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import addDefinition from '@/lib/definitions/addDefinition';
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
import { AutosizeTextarea } from '@/components/ui/autoresize-textarea';
import { LoadingButton } from '@/components/ui/loading-button';
import LangSelect from '@/components/forms/LangSelect';
import PosSelect from '@/components/forms/PosSelect';
import UsageNoteForm from '@/components/forms/UsageNoteForm';
import SourceForm from '@/components/forms/SourceForm';
import WordsSelect from '@/components/forms/WordsSelect';

export interface TranslationInputs {
  word: { word: string; lang: string };
  description: string;
  lang: string;
  pos: string;
  synonyms: string[];
  antonyms: string[];
  usage_note: string;
  source_title: string;
  source_link: string;
}

interface Props {
  wordLang: string;
  word: string;
  className?: string;
}

export default function AddDefinitionForm({
  wordLang,
  word,
  className = '',
}: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<TranslationInputs>({
    defaultValues: {
      word: { word: word, lang: wordLang },
    },
  });

  const onSubmit: SubmitHandler<TranslationInputs> = async (
    data: TranslationInputs,
  ) => {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.');
      router.push(`/login?next=${pathname}`);
      return;
    }

    const res = await addDefinition(wordLang, word, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      toast.success('Definition added');
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
                      />
                    </FormControl>
                    <FormMessage />
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
                    />
                  </FormControl>
                  <FormMessage />
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <LoadingButton
            className="ms-auto w-full sm:w-fit"
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={
              !(form.watch('description')?.trim() && form.watch('lang'))
            }
          >
            Add
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
