'use client';

import React, { useEffect, useState } from 'react';
import getCategories from '@/lib/phrases/getCategories';
import { cn } from '@/lib/utils';
import ListSelector from './ui/list-selector';

interface Props {
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  className?: string;
}

export default function CategorySelect({
  selectedCategories,
  setSelectedCategories,
  className = '',
}: Props) {
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategoryOptions(res.map(category => category.name));
    }

    fetchCategories();
  }, [])

  return (
    <ListSelector
      value={selectedCategories}
      defaultOptions={categoryOptions}
      onChange={setSelectedCategories}
      onSearch={async (q) => {
        q = q.toLowerCase();
        return categoryOptions.filter(option => option.toLowerCase().includes(q));
      }}
      triggerSearchOnFocus
      placeholder="categories..."
      hidePlaceholderWhenSelected
      emptyIndicator={<p className="text-center">No results found</p>}
      className={cn("!text-xs border-0 bg-accent/20", className)}
    />
  );
}
