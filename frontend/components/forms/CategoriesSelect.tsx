'use client';

import React, { useEffect, useState } from 'react';
import getCategories from '@/lib/phrases/getCategories';
import { cn } from '@/lib/utils';
import ListSelector from '../ui/list-selector';

interface Props {
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  include?: string[];
  exclude?: string[];
  className?: string;
}

export default function CategoriesSelect({
  selectedCategories,
  setSelectedCategories,
  include = [],
  exclude = [],
  className = '',
}: Props) {
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const results = await getCategories();
      const filteredCategories = results.filter((result) => {
        if (include.length > 0) {
          return include.includes(result.name);
        } else if (exclude.length > 0) {
          return !exclude.includes(result.name);
        }
        return true;
      });
      setCategoryOptions(filteredCategories.map((category) => category.name));
    };

    fetchCategories();
  }, []);

  return (
    <ListSelector
      value={selectedCategories}
      defaultOptions={categoryOptions}
      onChange={setSelectedCategories}
      onSearch={async (q) => {
        q = q.toLowerCase();
        return categoryOptions.filter((option) =>
          option.toLowerCase().includes(q)
        );
      }}
      triggerSearchOnFocus
      placeholder="categories..."
      hidePlaceholderWhenSelected
      emptyIndicator={<p className="text-center">No results found</p>}
      className={cn('!text-xs border-0 bg-accent/20', className)}
    />
  );
}
