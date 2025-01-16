'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import addPhrase from '@/lib/phrases/addPhrase';
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
import LangSelect from '@/components/LangSelect';
import UsageNoteForm from '@/components/UsageNoteForm';
import SourceForm from '@/components/SourceForm';
import CategorySelect from '@/components/CategorySelect';

export interface PhraseInputs {
  content: string;
  lang: string;
  categories: string[];
  usage_note: string;
  source_title: string;
  source_link: string;
}

interface Props {
  className?: string;
}

export default function AddPhraseForm({ className = '' }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<PhraseInputs>();
  const onSubmit: SubmitHandler<PhraseInputs> = async (data: PhraseInputs) => {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.');
      router.push(`/login?next=${pathname}`);
      return;
    }

    const res = await addPhrase(data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      router.push(`/phrases/${res.id}/`);
      toast.success('Posted');
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutosizeTextarea
                  className="p-1 text-xl resize-none borderless-input"
                  placeholder="Enter a phrase"
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
                        className="w-full"
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
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CategorySelect
                      selectedCategories={field.value}
                      setSelectedCategories={(value) =>
                        form.setValue('categories', value)
                      }
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
            disabled={!(form.watch('content')?.trim() && form.watch('lang'))}
          >
            Post
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
