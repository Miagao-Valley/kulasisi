import React from 'react';
import getPhrases from '@/lib/phrases/getPhrases';
import { cn } from '@/lib/utils';
import PhraseCard from './PhraseCard';
import ListPagination from '@/components/pagination/ListPagination';
import { Filter } from '@/components/filter/FilterMenu';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface Props {
  sourceLang?: string;
  targetLang?: string;
  searchTerm?: string;
  sortOption?: string;
  isDescending?: boolean;
  filters?: Filter;
  page?: number;
  className?: string;
}

export default async function PhrasesList({
  sourceLang = '',
  targetLang = '',
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const phrases = await getPhrases({
    search: searchTerm,
    ordering: sortOption,
    lang__code: sourceLang || '',
    contributor__username: filters?.contributor || '',
    categories__name: filters?.category || '',
    limit: limit,
    offset: limit * (page - 1),
  });

  return (
    <>
      <ul className={cn(className, 'flex flex-col')}>
        {phrases && phrases.results && phrases.results.length > 0 ? (
          <>
            {phrases.results.map(async (phrase) => {
              return (
                <li key={phrase.id}>
                  <PhraseCard
                    phrase={phrase}
                    targetLang={targetLang}
                    clickable
                    showTranslation
                  />
                  <Separator className="my-2" />
                </li>
              );
            })}
          </>
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            No phrases found
          </li>
        )}
      </ul>
      <ListPagination
        className="my-5 flex justify-center"
        numPages={phrases?.num_pages || 1}
        currentPage={page}
        next={!!phrases?.next}
        prev={!!phrases?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function PhrasesListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={cn(className, 'flex flex-col gap-3')}>
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={i} className="h-36 rounded-xl" />
      ))}
    </ul>
  );
}
