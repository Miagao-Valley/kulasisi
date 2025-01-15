import React from 'react';
import getVotes from '@/lib/vote/getVotes';
import getTranslations from '@/lib/translations/getTranslations';
import getTranslationRevisions from '@/lib/translations/getTranslationRevisions';
import { cn } from '@/lib/utils';
import TranslationCard from './TranslationCard';
import ListPagination from '@/components/ListPagination';
import { Filter } from '@/components/FilterMenu';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface Props {
  phraseId?: number;
  searchTerm?: string;
  sortOption?: string;
  isDescending?: boolean;
  filters?: Filter;
  page?: number;
  className?: string;
}

export default async function TranslationsList({
  phraseId,
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const translations = await getTranslations(
    {
      search: searchTerm,
      ordering: sortOption,
      lang__code: filters?.lang || '',
      contributor__username: filters?.contributor || '',
      limit: limit,
      offset: limit * (page - 1),
    },
    phraseId,
  );

  return (
    <>
      <ul className={cn(className, 'flex flex-col')}>
        {translations &&
        translations.results &&
        translations.results.length > 0 ? (
          <>
            {translations.results.map(async (translation) => {
              const votes = await getVotes(translation);
              const revisions = await getTranslationRevisions(translation.id);
              return (
                <li key={translation.id}>
                  <Separator className="my-2" />
                  <div id={`translation-${translation.id}`}>
                    <TranslationCard
                      translation={translation}
                      votes={votes}
                      revisions={revisions.results}
                    />
                  </div>
                </li>
              );
            })}
            <Separator className="my-2" />
          </>
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            No translations found
          </li>
        )}
      </ul>
      <ListPagination
        className="my-5 flex justify-center"
        numPages={translations?.num_pages || 1}
        currentPage={page}
        next={!!translations?.next}
        prev={!!translations?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function TranslationsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={cn(className, 'flex flex-col gap-3')}>
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton className="h-36 rounded-xl" key={i}></Skeleton>
      ))}
    </ul>
  );
}
