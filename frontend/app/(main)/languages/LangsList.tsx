import React from 'react';
import { getLangs } from '@/lib/langs/getLangs';
import { cn } from '@/lib/utils';
import { LangCard } from '@/components/cards/LangCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  searchTerm: string;
  sortOption: string;
  className?: string;
}

export async function LangsList({
  searchTerm,
  sortOption,
  className = '',
}: Props) {
  const langs = await getLangs({
    search: searchTerm,
    ordering: sortOption,
  });

  return (
    <ul
      className={cn(
        className,
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      )}
    >
      {langs && langs.results && langs.results.length > 0 ? (
        langs.results.map((lang) => (
          <li key={lang.code}>
            <LangCard lang={lang} className="w-full h-full" />
          </li>
        ))
      ) : (
        <li className="w-full col-span-full text-center p-3">
          No languages found
        </li>
      )}
    </ul>
  );
}

interface SkeletonProps {
  className?: string;
}

export function LangsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul
      className={cn(
        className,
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'
      )}
    >
      {Array.from({ length: 24 }, (_, i) => (
        <Skeleton key={i} className="h-20 rounded-xl"></Skeleton>
      ))}
    </ul>
  );
}
