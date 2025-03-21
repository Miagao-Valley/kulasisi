'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import addWord from '@/lib/words/addWord';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import LangSelect from '@/components/forms/LangSelect';
import SourceForm from '@/components/forms/SourceForm';

const FORM_DATA_KEY = 'add-word-form';

const addWordSchema = z.object({
  word: z.string().min(1, 'Word is required'),
  lang: z.string().min(1, 'Language is required'),
  source_title: z.string().optional(),
  source_link: z.string().url().optional().or(z.literal('')),
});

type AddWordSchema = z.infer<typeof addWordSchema>;

interface Props {
  className?: string;
}

export default function AddWordForm({ className = '' }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<AddWordSchema>({
    resolver: zodResolver(addWordSchema),
  });

  useEffect(() => {
    const savedData = localStorage.getItem(FORM_DATA_KEY);
    if (savedData) {
      form.reset(JSON.parse(savedData));
    }
  }, [form]);

  async function onSubmit(data: AddWordSchema) {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.');
      router.push(`/login?next=${pathname}`);
      return;
    }

    const res = await addWord(data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      router.push(`/dictionary/${res.lang}/${res.word}/`);
      toast.success('Posted');
    }

    localStorage.removeItem(FORM_DATA_KEY);

    return res;
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
          name="word"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="p-1 !text-3xl font-bold borderless-input"
                  type="text"
                  placeholder="word"
                  {...field}
                />
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
            Post
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
