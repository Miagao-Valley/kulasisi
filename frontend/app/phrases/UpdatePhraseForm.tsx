'use client';

import React, { useEffect, useState } from 'react';
import updatePhrase from '@/lib/phrases/updatePhrase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm, SubmitHandler } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import getCategories from '@/lib/phrases/getCategories';
import { Phrase } from '@/types/phrases';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { AutosizeTextarea } from '@/components/ui/autoresize-textarea';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import ListSelector from '@/components/ui/list-selector';

export interface PhraseInputs {
  content: string;
  categories: string[];
}

interface Props {
  phrase: Phrase;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdatePhraseForm({
  phrase,
  setIsEditing,
  className = '',
}: Props) {
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
    const res = await updatePhrase(phrase.id, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      setIsEditing(false);
      toast.success('Entry updated');
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

        <div>
          <FormField
            control={form.control}
            name="content"
            defaultValue={phrase.content}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutosizeTextarea
                    className="p-1 text-base resize-none borderless-input"
                    placeholder="Enter updated phrase"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            defaultValue={phrase.categories}
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
                    placeholder="Select categories..."
                    hidePlaceholderWhenSelected
                    emptyIndicator={<p className="text-center">No results found</p>}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={form.formState.isSubmitting}
            disabled={
              (!form.watch('content')?.trim() ||
              form.watch('content')?.trim() === phrase.content) &&
              form.watch('categories') == phrase.categories
            }
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
