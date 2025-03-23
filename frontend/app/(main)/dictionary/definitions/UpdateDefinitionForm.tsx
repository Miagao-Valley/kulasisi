'use client';

import { updateDefinition } from '@/lib/definitions/updateDefinition';
import { Definition } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { setFormErrors } from '@/lib/utils/setFormErrors';
import {
  updateDefinitionSchema,
  UpdateDefinitionSchema,
} from '@/lib/schemas/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { PosSelect } from '@/components/forms/PosSelect';
import { UsageNoteForm } from '@/components/forms/UsageNoteForm';
import { SourceForm } from '@/components/forms/SourceForm';
import { WordsSelect } from '@/components/forms/WordsSelect';

interface Props {
  definition: Definition;
  setIsEditing: (isEditing: boolean) => void;
  className?: string;
}

export function UpdateDefinitionForm({
  definition,
  setIsEditing,
  className = '',
}: Props) {
  const form = useForm<UpdateDefinitionSchema>({
    resolver: zodResolver(updateDefinitionSchema),
    defaultValues: {
      description: definition.description || '',
      pos: definition.pos || '',
      synonyms: definition.synonyms || [],
      antonyms: definition.antonyms || [],
      usage_note: definition.usage_note || '',
      source_title: definition.source_title || '',
      source_link: definition.source_link || '',
    },
  });

  async function onSubmit(formData: UpdateDefinitionSchema) {
    const { data, error } = await updateDefinition(
      definition.word.lang,
      definition.word.word,
      definition.id,
      formData
    );
    if (error) {
      setFormErrors(error, form.setError);
    } else {
      setIsEditing(false);
      toast.success('Definition updated');
    }
    return { data, error };
  }

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
                      error={form.formState.errors?.pos?.message}
                    />
                  </FormControl>
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
                      exclude={[
                        definition.word.word,
                        ...(form.watch('antonyms') ||
                          definition.antonyms ||
                          []),
                      ]}
                      lang={definition.lang}
                      placeholder="synonyms..."
                      error={form.formState.errors?.synonyms?.message}
                    />
                  </FormControl>
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
                      exclude={[
                        definition.word.word,
                        ...(form.watch('synonyms') ||
                          definition.synonyms ||
                          []),
                      ]}
                      lang={definition.lang}
                      placeholder="antonyms..."
                      error={form.formState.errors?.antonyms?.message}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="ms-auto w-full sm:w-fit flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full sm:w-fit bg-transparent"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              size="sm"
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
