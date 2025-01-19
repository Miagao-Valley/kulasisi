'use client';

import React from 'react';
import updateDefinition from '@/lib/definitions/updateDefinition';
import { Definition } from '@/types/dictionary';
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
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-button';
import PosSelect from '@/components/PosSelect';
import UsageNoteForm from '@/components/UsageNoteForm';
import SourceForm from '@/components/SourceForm';
import WordsSelect from '@/components/WordsSelect';

export interface DefinitionInputs {
  description: string;
  pos: string;
  synonyms: string[];
  antonyms: string[];
  usage_note: string;
  source_title: string;
  source_link: string;
}
interface Props {
  definition: Definition;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdateDefinitionForm({
  definition,
  setIsEditing,
  className = '',
}: Props) {
  const form = useForm<DefinitionInputs>();
  const onSubmit: SubmitHandler<DefinitionInputs> = async (
    data: DefinitionInputs,
  ) => {
    const res = await updateDefinition(definition.word, definition.id, data);
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
          name="description"
          defaultValue={definition.description}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <AutosizeTextarea
                  className="p-1 text-base resize-none borderless-input bg-transparent"
                  placeholder="Enter updated definition"
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
              <UsageNoteForm
                form={form}
                defaultUsageNote={definition.usage_note}
              />
              <SourceForm
                form={form}
                defaultSourceTitle={definition.source_title}
                defaultSourceLink={definition.source_link}
              />
            </div>
            <FormField
              control={form.control}
              name="pos"
              defaultValue={definition.pos}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PosSelect
                      selectedPos={field.value}
                      setSelectedPos={(value) => form.setValue('pos', value)}
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
              defaultValue={definition.synonyms}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <WordsSelect
                      selectedWords={field.value}
                      setSelectedWords={(value) =>
                        form.setValue('synonyms', value)
                      }
                      placeholder="synonyms..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="antonyms"
              defaultValue={definition.antonyms}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <WordsSelect
                      selectedWords={field.value}
                      setSelectedWords={(value) =>
                        form.setValue('antonyms', value)
                      }
                      placeholder="antonyms..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="ms-auto flex justify-end gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Save
            </LoadingButton>
          </div>
        </div>
      </form>
    </Form>
  );
}
