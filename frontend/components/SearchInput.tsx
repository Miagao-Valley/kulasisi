'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface Props {
  currentSearchTerm: string;
  className?: string;
}

export default function SearchInput({ currentSearchTerm, className }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(currentSearchTerm);
  const [query] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const currentSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );
    if (query) {
      currentSearchParams.set('q', query);
    } else {
      currentSearchParams.delete('q');
    }
    router.push(`?${currentSearchParams.toString()}`);
  }, [query, searchParams, router]);

  return (
    <Input
      className={cn(className, 'grow w-full max-w-80')}
      type="text"
      value={searchTerm}
      placeholder="Search"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
