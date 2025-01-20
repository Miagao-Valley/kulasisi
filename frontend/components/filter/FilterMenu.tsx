'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Filter, ChevronsUpDown, Check } from 'lucide-react';
import { Label } from '../ui/label';

export interface Filter {
  [key: string]: boolean | string;
}

export interface FilterOption {
  label: string;
  name: string;
  type: 'checkbox' | 'select';
  options?: { label: string; value: string }[];
}

interface Props {
  currentFilters: Filter;
  filterOptions: FilterOption[];
  className?: string;
}

export default function FilterMenu({
  filterOptions,
  currentFilters,
  className,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(currentFilters);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );

    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        let processedValue = value;
        if (typeof processedValue === 'boolean') {
          processedValue = processedValue ? 'true' : 'false';
        }
        currentSearchParams.set(key, processedValue);
      } else {
        currentSearchParams.delete(key);
      }
    }

    router.push(`?${currentSearchParams.toString()}`);
  }, [filters, searchParams, router]);

  return (
    <div className={cn(className, '')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="p-1 h-fit flex gap-1">
            <Filter /> Filter
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <div className="flex flex-col gap-3">
            <Label className="font-bold">Filter</Label>
            {filterOptions.map(({ label, name, type, options }) =>
              type === 'checkbox' ? (
                <FilterCheckbox
                  key={name}
                  label={label}
                  name={name}
                  filters={filters}
                  setFilters={setFilters}
                />
              ) : type === 'select' && options ? (
                <FilterSelect
                  key={name}
                  label={label}
                  name={name}
                  options={options}
                  filters={filters}
                  setFilters={setFilters}
                />
              ) : (
                <div>No filters</div>
              ),
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface FilterCheckboxProps {
  label: string;
  name: string;
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

export function FilterCheckbox({
  label,
  name,
  filters,
  setFilters,
}: FilterCheckboxProps) {
  return (
    <div className="flex items-center gap-2" key={name}>
      <label
        htmlFor={label}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <Checkbox
        id={label}
        name={name}
        checked={!!filters[name]}
        onChange={() =>
          setFilters((prev) => ({
            ...prev,
            [name]: !filters[name],
          }))
        }
      />
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

export function FilterSelect({
  label,
  name,
  options,
  filters,
  setFilters,
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {filters[name]
            ? options.find((option) => option.value === filters[name])?.label
            : `Select ${label}...`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0">
        <Command
          filter={(value, search) => {
            const option = options.find((option) => option.value === value);
            if (!option) return 0;
            if (option.label.toLowerCase().includes(search.toLowerCase()))
              return 1;
            return 0;
          }}
        >
          <CommandInput placeholder={`Search ${label}...`} className="h-9" />
          <CommandList>
            <CommandEmpty>No {label} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue: string) => {
                    setFilters((prev) => ({
                      ...prev,
                      [name]:
                        currentValue === filters[name] ? '' : currentValue,
                    }));
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto',
                      filters[name] === option.value
                        ? 'opacity-100'
                        : 'opacity-0',
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
