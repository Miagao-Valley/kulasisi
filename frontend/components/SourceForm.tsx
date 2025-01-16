'use client';

import React, { useState, useEffect } from 'react';
import { Path, PathValue, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { LinkIcon } from 'lucide-react';

export interface Inputs {
  source_title: string;
  source_link: string;
}

interface Props<T extends Inputs> {
  form: UseFormReturn<T, any, undefined>;
  defaultSourceTitle?: string;
  defaultSourceLink?: string;
}

export default function SourceForm<T extends Inputs>({
  form,
  defaultSourceTitle,
  defaultSourceLink,
}: Props<T>) {
  const [sourceLabel, setSourceLabel] = useState<string>(
    form.watch('source_title' as Path<T>)?.trim() ||
      form.watch('source_link' as Path<T>)?.trim() ||
      defaultSourceTitle ||
      defaultSourceLink ||
      '',
  );

  useEffect(() => {
    const subscription = form.watch((values) => {
      setSourceLabel(
        values.source_title?.trim() ||
          values.source_link?.trim() ||
          defaultSourceTitle ||
          defaultSourceLink ||
          '',
      );
    });

    return () => subscription.unsubscribe();
  }, [form, defaultSourceTitle, defaultSourceLink]);

  const handleButtonDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const sourceLink = form.watch('source_link' as Path<T>)?.trim();
    if (sourceLink) {
      window.open(sourceLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Popover>
      <PopoverTrigger onDoubleClick={handleButtonDoubleClick} asChild>
        <Button
          variant={'ghost'}
          size="sm"
          className={cn(
            `max-w-24 md:max-w-32 flex gap-1 p-2 h-fit ${form.watch('source_link' as Path<T>)?.trim() && 'text-primary'}`,
            (form.formState.errors.source_title ||
              form.formState.errors.source_link) &&
              'text-destructive',
          )}
        >
          <LinkIcon />
          {sourceLabel && (
            <span className="truncate hidden sm:flex w-fit">{sourceLabel}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-80">
        <div className="flex flex-col gap-3">
          <FormLabel>Source</FormLabel>
          <FormField
            control={form.control}
            name={'source_title' as Path<T>}
            defaultValue={defaultSourceTitle as PathValue<T, Path<T>>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput label="Title" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={'source_link' as Path<T>}
            defaultValue={defaultSourceLink as PathValue<T, Path<T>>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput label="Link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
