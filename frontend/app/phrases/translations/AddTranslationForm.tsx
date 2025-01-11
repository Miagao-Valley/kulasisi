'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import addTranslation from '@/lib/translations/addTranslation';
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
import SourceForm from '@/components/SourceForm';

export interface TranslationInputs {
  phrase: number;
  content: string;
  lang: string;
  source_title: string;
  source_link: string;
}

interface Props {
  phraseId: number;
  originalLang: string;
  className?: string;
}

export default function AddTranslationForm({
  phraseId,
  originalLang,
  className = '',
}: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<TranslationInputs>({
    defaultValues: {
      phrase: phraseId,
    },
  });

  const onSubmit: SubmitHandler<TranslationInputs> = async (
    data: TranslationInputs,
  ) => {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to post.');
      router.push(`/auth/login?next=${pathname}`);
      return;
    }

    const res = await addTranslation(phraseId, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      toast.success('Translation added');
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
                  placeholder="Enter your translation"
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
                    exclude={[originalLang]}
                    placeholder="Language"
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
            disabled={!(form.watch('content')?.trim() && form.watch('lang'))}
          >
            Add
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
