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

export interface WordInputs {
  word: string;
  lang: string;
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
      router.push(`/auth/login?next=${pathname}`);
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

        <div className="flex gap-2 items-center">
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
