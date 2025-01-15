'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import addPhrase from '@/lib/phrases/addPhrase';
import getCategories from '@/lib/phrases/getCategories';
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
import ListSelector from '@/components/ui/list-selector';
import LangSelect from '@/components/LangSelect';
import UsageNoteForm from '@/components/UsageNoteForm';
import SourceForm from '@/components/SourceForm';

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

  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategoryOptions(res.map(category => category.name));
    }

    fetchCategories();
  }, [])

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

        <div className="flex flex-col md:flex-row gap-2 items-center">
          <FormField
            control={form.control}
            name="lang"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LangSelect
                    selectedLang={field.value}
                    setSelectedLang={(value) => form.setValue('lang', value)}
                    placeholder="Language"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <UsageNoteForm form={form} />

          <SourceForm form={form} />

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ListSelector
                    {...field}
                    defaultOptions={categoryOptions}
                    onSearch={async (q) => {
                      q = q.toLowerCase();
                      return categoryOptions.filter(option => option.toLowerCase().includes(q));
                    }}
                    triggerSearchOnFocus
                    placeholder="Categories..."
                    hidePlaceholderWhenSelected
                    emptyIndicator={<p className="text-center">No results found</p>}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            className="ms-auto"
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
