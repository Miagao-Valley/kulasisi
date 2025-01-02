import React from 'react';
import getWords from '@/lib/words/getWords';
import getWordRevisions from '@/lib/words/getWordRevisions';
import getVotes from '@/lib/vote/getVotes'
import { cn } from '@/lib/utils';
import WordCard from './WordCard';
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

export default async function WordsList({
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const words = await getWords({
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
        {words && words.results && words.results.length > 0 ? (
          words.results.map(async (word) => {
            const votes = await getVotes(word);
            const revisions = await getWordRevisions(word.id);
            return (
              <li key={word.id}>
                <WordCard word={word} votes={votes} revisions={revisions.results} />
              </li>
            );
          })
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            No words found
          </li>
        )}
      </ul>
      <ListPagination
        className="my-5 flex justify-center"
        numPages={words?.num_pages || 1}
        currentPage={page}
        next={!!words?.next}
        prev={!!words?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function WordsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={cn(className, 'flex flex-col gap-3')}>
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton className="h-36 rounded-xl" key={i}></Skeleton>
      ))}
    </ul>
  );
}
