'use client';

import React from 'react';
import { Path, UseFormReturn } from 'react-hook-form';
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
import { Textarea } from '../ui/textarea';
import { CircleHelp } from 'lucide-react';

export interface UsageNoteSchema {
  usage_note?: string;
}

interface Props<T extends UsageNoteSchema> {
  form: UseFormReturn<T, any, undefined>;
}

export default function UsageNoteForm<T extends UsageNoteSchema>({
  form,
}: Props<T>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'max-w-32 p-2 h-fit',
            form.formState.errors.usage_note && 'text-destructive'
          )}
        >
          <CircleHelp />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-3">
          <FormLabel className="text-base">How to use?</FormLabel>

          <FormField
            control={form.control}
            name={'usage_note' as Path<T>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Enter usage note"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="mt-1 text-xs text-muted-foreground">
            This usage note should provides guidance on the correct context or
            meaning of the entry.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
