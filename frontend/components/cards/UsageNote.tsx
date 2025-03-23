'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CircleHelp } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { useIsMobile } from '@/hooks/use-mobile';

interface Props {
  note: string;
}

export function UsageNote({ note }: Props) {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const [debouncedOpen] = useDebounce(open, 200);

  return (
    <Popover open={debouncedOpen}>
      <PopoverTrigger
        asChild
        onClick={() => isMobile && setOpen(!open)}
        onMouseEnter={() => !isMobile && setOpen(true)}
        onMouseLeave={() => !isMobile && setOpen(false)}
      >
        <Button variant="ghost" size="sm" className="p-1 h-fit">
          <CircleHelp className="w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onClick={() => isMobile && setOpen(!open)}
        onMouseEnter={() => !isMobile && setOpen(true)}
        onMouseLeave={() => !isMobile && setOpen(false)}
      >
        <Label className="text-base">How to use?</Label>

        <p className="text-sm mb-2">{note}</p>

        <p className="mt-1 text-xs text-muted-foreground">
          This usage note provides guidance on the correct context or meaning of
          the entry.
        </p>
      </PopoverContent>
    </Popover>
  );
}
