'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { cn } from '@/lib/utils';
import { AutosizeTextarea } from '@/components/ui/autoresize-textarea';

interface Props {
  currentSearchTerm: string;
  className?: string;
}

export default function PhraseSearch({ currentSearchTerm, className }: Props) {
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
    <AutosizeTextarea
      className={cn(className, 'p-1 text-xl resize-none borderless-input')}
      value={searchTerm}
      placeholder="Search for a phrase to translate"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
