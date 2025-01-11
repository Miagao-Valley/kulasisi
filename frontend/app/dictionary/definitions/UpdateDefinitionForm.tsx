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

export interface DefinitionInputs {
  description: string;
  pos: string;
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
        className={cn(className, 'flex flex-col gap-3')}
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
                  className="p-1 text-base resize-none borderless-input"
                  placeholder="Enter updated definition"
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
            name="pos"
            defaultValue={definition.pos}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PosSelect
                    selectedPos={field.value}
                    setSelectedPos={(value) => form.setValue('pos', value)}
                    placeholder="POS"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
