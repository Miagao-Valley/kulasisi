import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { Path, PathValue, UseFormReturn } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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

export default function SourcePopover<T extends Inputs>({ form , defaultSourceTitle, defaultSourceLink }: Props<T>) {
  const [open, setOpen] = useState(false);
  const [debouncedOpen,] = useDebounce(open, 200);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const sourceLink = form.watch('source_link' as Path<T>)?.trim();
    if (sourceLink) {
      window.open(sourceLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Popover open={debouncedOpen}>
      <PopoverTrigger
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={handleButtonClick}
        asChild
      >
        <Button
          variant="outline"
          className="max-w-32"
        >
          <LinkIcon />
          <span className="truncate">
            {
              form.watch('source_title' as Path<T>)?.trim() ||
              form.watch('source_link' as Path<T>)?.trim() ||
              defaultSourceTitle || defaultSourceLink ||
              'Source'
            }
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex flex-col gap-3">
          <FormLabel>Source</FormLabel>
          <FormField
            control={form.control}
            name={"source_title" as Path<T>}
            defaultValue={defaultSourceTitle as PathValue<T, Path<T>>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    label="Title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={"source_link" as Path<T>}
            defaultValue={defaultSourceLink as PathValue<T, Path<T>>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    label="Link"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
