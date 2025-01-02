import React from 'react';
import getPhrases from '@/lib/phrases/getPhrases';
import getPhraseRevisions from '@/lib/phrases/getPhraseRevisions';
import getVotes from '@/lib/vote/getVotes';
import { cn } from '@/lib/utils';
import PhraseCard from './PhraseCard';
import ListPagination from '@/components/ListPagination';
import { Filter } from '@/components/FilterMenu';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  searchTerm?: string;
  sortOption?: string;
  isDescending?: boolean;
  filters?: Filter;
  page?: number;
  className?: string;
}

export default async function PhrasesList({
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
    lang__code: filters?.lang || '',
    contributor__username: filters?.contributor || '',
    limit: limit,
    offset: limit * (page - 1),
  });

  return (
    <>
      <ul className={cn(className, 'flex flex-col gap-3')}>
        {phrases && phrases.results && phrases.results.length > 0 ? (
          phrases.results.map(async (phrase) => {
            const votes = await getVotes(phrase);
            const revisions = await getPhraseRevisions(phrase.id);
            return (
              <li key={phrase.id}>
                <PhraseCard
                  phrase={phrase}
                  votes={votes}
                  revisions={revisions.results}
                />
              </li>
            );
          })
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
