'use client';

import React, { useEffect, useState } from 'react';
import { PartOfSpeech } from '@/types/dictionary';
import getPartsOfSpeech from '@/lib/definitions/getPartsOfSpeech';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ChevronsUpDown, Check } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Props {
  selectedPos?: string;
  setSelectedPos: (value: string) => void;
  include?: string[];
  exclude?: string[];
  error?: React.ReactNode;
  className?: string;
}

export default function PosSelect({
  selectedPos,
  setSelectedPos,
  include = [],
  exclude = [],
  error,
  className = '',
}: Props) {
  const [partsOfSpeech, setPartsOfSpeech] = useState<PartOfSpeech[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPartsOfSpeech = async () => {
      const results = await getPartsOfSpeech();
      const filteredPartsOfSpeech = results.filter((result) => {
        if (include.length > 0) {
          return include.includes(result.abbr);
        } else if (exclude.length > 0) {
          return !exclude.includes(result.abbr);
        }
        return true;
      });
      setPartsOfSpeech(filteredPartsOfSpeech);
    };

    fetchPartsOfSpeech();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={selectedPos ? null : 'ghost'}
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={cn('justify-between gap-1 px-1', className)}
        >
          <ChevronsUpDown className="opacity-50" />
          {selectedPos ? (
            <Badge variant="outline">
              {partsOfSpeech.find((pos) => pos.abbr === selectedPos)?.abbr}
            </Badge>
          ) : (
            'POS'
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-0">
        <Command
          onValueChange={(value) => setSelectedPos(value)}
          filter={(abbr, search) => {
            const pos = partsOfSpeech.find((pos) => pos.abbr === abbr);
            if (!pos) return 0;
            if (pos.name.toLowerCase().includes(search.toLowerCase())) return 1;
            return 0;
          }}
        >
          <CommandInput
            placeholder={`Search part of speech...`}
            className={cn('h-9', error && 'border border-destructive')}
          />
          <CommandList>
            {error && (
              <div className="py-2 text-center text-sm text-destructive border-b">
                {error}
              </div>
            )}
            <CommandEmpty>No part of speech found.</CommandEmpty>
            <CommandGroup>
              {partsOfSpeech.map((pos) => (
                <CommandItem
                  key={pos.abbr}
                  value={pos.abbr}
                  onSelect={(currentLang: string) => {
                    setSelectedPos(
                      currentLang === selectedPos ? '' : currentLang
                    );
                    setOpen(false);
                  }}
                >
                  {pos.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedPos === pos.abbr ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
