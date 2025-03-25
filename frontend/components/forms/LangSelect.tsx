'use client';

import { useEffect, useState } from 'react';
import { Lang } from '@/types/languages';
import { getLangs } from '@/lib/langs/getLangs';
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
import { ChevronsUpDown, Check, LanguagesIcon } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Props {
  selectedLang: string;
  setSelectedLang: (value: string) => void;
  include?: string[];
  exclude?: string[];
  showChevrons?: boolean;
  placeholder?: string;
  error?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function LangSelect({
  selectedLang,
  setSelectedLang,
  include = [],
  exclude = [],
  showChevrons = true,
  placeholder,
  error,
  className = '',
  onClick,
  disabled = false,
}: Props) {
  const [langs, setLangs] = useState<Lang[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchLangs = async () => {
      const { results } = await getLangs();
      const filteredLangs = results.filter((result) => {
        if (include.length > 0) {
          return include.includes(result.code);
        } else if (exclude.length > 0) {
          return !exclude.includes(result.code);
        }
        return true;
      });
      setLangs(filteredLangs);
    };

    fetchLangs();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={selectedLang || placeholder ? null : 'ghost'}
          size="sm"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'justify-between gap-1 px-1',
            error && 'text-destructive',
            className
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {showChevrons && <ChevronsUpDown className="opacity-50" />}
          {selectedLang ? (
            <Badge variant="outline">{selectedLang}</Badge>
          ) : placeholder ? (
            <Badge variant="outline">{placeholder}</Badge>
          ) : (
            <LanguagesIcon />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-0">
        <Command
          onValueChange={(value: string) => setSelectedLang(value)}
          filter={(code: string, search: string) => {
            const lang = langs.find((lang) => lang.code === code);
            if (!lang) return 0;
            if (lang.name.toLowerCase().includes(search.toLowerCase()))
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder={`Search language...`} className="h-9" />
          <CommandList>
            {error && (
              <div className="py-2 text-center text-sm text-destructive border-b">
                {error}
              </div>
            )}
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {langs.map((lang) => (
                <CommandItem
                  key={lang.code}
                  value={lang.code}
                  onSelect={(currentLang: string) => {
                    setSelectedLang(
                      currentLang === selectedLang ? '' : currentLang
                    );
                    setOpen(false);
                  }}
                >
                  {lang.name}
                  <Check
                    className={cn(
                      'ml-auto',
                      selectedLang === lang.code ? 'opacity-100' : 'opacity-0'
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
