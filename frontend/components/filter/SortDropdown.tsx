'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from 'lucide-react';

export interface SortOption {
  label: string;
  value: string;
}

interface Props {
  currentSortOption: string;
  sortingOptions: SortOption[];
  className?: string;
}

export function SortDropdown({
  currentSortOption,
  sortingOptions,
  className,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortOption, setSortOption] = useState(currentSortOption);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    if (sortOption) {
      currentSearchParams.set('sort', sortOption);
    } else {
      currentSearchParams.delete('sort');
    }
    router.push(`?${currentSearchParams.toString()}`);
  }, [sortOption, searchParams, router]);

  const toggleSort = () => {
    setSortOption(
      (prev) => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`) // Toggle the sort order
    );
  };

  return (
    <div className={cn(className, 'flex flex-row')}>
      <Button
        variant="ghost"
        size="sm"
        className="p-1 h-fit"
        onClick={toggleSort}
      >
        {sortOption.startsWith('-') ? (
          <ArrowDownWideNarrow className="h-2 w-2" />
        ) : (
          <ArrowUpNarrowWide className="h-2 w-2" />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="p-1 h-fit flex gap-1">
            Sort:{' '}
            <b>
              {sortingOptions.find(
                (option) =>
                  option.value.replace(/^-/g, '') ===
                  sortOption.replace(/^-/g, '')
              )?.label || 'None'}
            </b>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sort</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sortOption}
            onValueChange={setSortOption}
          >
            {sortingOptions.map(({ label, value }) => (
              <DropdownMenuRadioItem key={value} value={value}>
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
