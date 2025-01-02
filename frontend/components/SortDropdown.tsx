'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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

export default function SortDropdown({
  currentSortOption,
  sortingOptions,
  className,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortOption, setSortOption] = useState(currentSortOption);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
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
      (prev) => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`), // Toggle the sort order
    );
  };

  return (
    <div className={cn(className, 'flex flex-row gap-1')}>
      <Button variant="outline" size="icon" onClick={toggleSort}>
        {sortOption.startsWith('-') ? (
          <ArrowDownWideNarrow />
        ) : (
          <ArrowUpNarrowWide />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Sort: {sortingOptions.find(
              (option) =>
                option.value.replace(/^-/g, '') === sortOption.replace(/^-/g, ''),
            )?.label || 'None'}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sort</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortOption} onValueChange={setSortOption}>
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
