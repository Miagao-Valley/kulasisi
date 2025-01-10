'use client';

import React, { useEffect, useState } from 'react';
import { Lang } from '@/types/languages';
import getLangs from '@/lib/langs/getLangs';
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

interface Props {
  selectedLang: string;
  setSelectedLang: (value: string) => void;
  exclude?: string[];
  placeholder?: string;
}

export default function LangSelect({
  selectedLang,
  setSelectedLang,
  exclude = [],
  placeholder = 'Select language...'
}: Props) {
  const [langs, setLangs] = useState<Lang[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchLangs = async () => {
      const { results } = await getLangs();
      setLangs(results.filter((result) => !exclude.includes(result.code)));
    };

    fetchLangs();
  }, [exclude]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedLang
            ? langs.find((lang) => lang.code === selectedLang)?.name
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-0">
        <Command
          onValueChange={(value) => setSelectedLang(value)}
          filter={(code, search) => {
            const lang = langs.find((lang) => lang.code === code);
            if (!lang) return 0;
            if (lang.name.toLowerCase().includes(search.toLowerCase()))
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder={`Search language...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {langs.map((lang) => (
                <CommandItem
                  key={lang.code}
                  value={lang.code}
                  onSelect={(currentLang: string) => {
                    setSelectedLang(
                      currentLang === selectedLang ? '' : currentLang,
                    );
                    setOpen(false);
                  }}
                >
                  {lang.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedLang === lang.code ? 'opacity-100' : 'opacity-0',
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
