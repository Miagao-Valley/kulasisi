import React from 'react';
import { getPartsOfSpeech } from '@/lib/definitions/getPartsOfSpeech';
import { cn } from '@/lib/utils';
import { PosCard } from '@/components/cards/PosCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  searchTerm: string;
  sortOption: string;
  className?: string;
}

export async function PosList({
  searchTerm,
  sortOption,
  className = '',
}: Props) {
  const partsOfSpeech = await getPartsOfSpeech({
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
      {partsOfSpeech && partsOfSpeech.length > 0 ? (
        partsOfSpeech.map((pos) => (
          <li key={pos.abbr}>
            <PosCard pos={pos} className="w-full h-full" />
          </li>
        ))
      ) : (
        <li className="w-full col-span-full text-center p-3">
          No partsOfSpeech found
        </li>
      )}
    </ul>
  );
}

interface SkeletonProps {
  className?: string;
}

export function PosListSkeleton({ className = '' }: SkeletonProps) {
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
