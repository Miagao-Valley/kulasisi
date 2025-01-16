'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import addWord from '@/lib/words/addWord';
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
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/loading-button';
import LangSelect from '@/components/LangSelect';
import SourceForm from '@/components/SourceForm';

export interface WordInputs {
  word: string;
  lang: string;
  source_title: string;
  source_link: string;
}

interface Props {
  className?: string;
}

export default function AddWordForm({ className = '' }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<WordInputs>();
  const onSubmit: SubmitHandler<WordInputs> = async (data: WordInputs) => {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.');
      router.push(`/login?next=${pathname}`);
      return;
    }

    const res = await addWord(data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      router.push(`/dictionary/${res.id}/`);
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SourceForm form={form} />

          <LoadingButton
            className="ms-auto"
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={!(form.watch('word')?.trim() && form.watch('lang'))}
          >
            Post
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
