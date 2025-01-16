'use client';

import React from 'react';
import updatePhrase from '@/lib/phrases/updatePhrase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm, SubmitHandler } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
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
import UsageNoteForm from '@/components/UsageNoteForm';
import SourceForm from '@/components/SourceForm';
import CategorySelect from '@/components/CategorySelect';

export interface PhraseInputs {
  content: string;
  categories: string[];
  usage_note: string;
  source_title: string;
  source_link: string;
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
        className={cn(className, 'flex flex-col gap-0')}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormMessage>
          {form.formState.errors.root?.serverError.message}
        </FormMessage>

        <FormField
          control={form.control}
          name="content"
          defaultValue={phrase.content}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutosizeTextarea
                  className="p-1 text-base resize-none borderless-input bg-transparent"
                  placeholder="Enter updated phrase"
                  autoFocus
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
              <UsageNoteForm form={form} defaultUsageNote={phrase.usage_note} />
              <SourceForm
                form={form}
                defaultSourceTitle={phrase.source_title}
                defaultSourceLink={phrase.source_link}
              />
            </div>
            <FormField
              control={form.control}
              name="categories"
              defaultValue={phrase.categories}
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

          <div className="ms-auto w-full sm:w-fit flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-fit"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              className="w-full sm:w-fit"
              loading={form.formState.isSubmitting}
            >
              Save
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
