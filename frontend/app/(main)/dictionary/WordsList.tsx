import { getWords } from '@/lib/words/getWords';
import { cn } from '@/lib/utils';
import { WordCard } from './WordCard';
import { ListPagination } from '@/components/pagination/ListPagination';
import { Filter } from '@/components/filter/FilterMenu';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface Props {
  sourceLang?: string;
  targetLang?: string;
  searchTerm?: string;
  sortOption?: string;
  filters?: Filter;
  page?: number;
  className?: string;
}

export async function WordsList({
  sourceLang = '',
  targetLang = '',
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const { results: words, pagination } = await getWords({
    search: searchTerm,
    ordering: sortOption,
    lang__code: sourceLang,
    contributor__username: filters?.contributor,
    definitions__pos__abbr: filters?.pos,
    limit: limit,
    offset: limit * (page - 1),
  });

  return (
    <>
      <ul className={cn(className, 'flex flex-col')}>
        {words.length > 0 ? (
          <>
            {words.map(async (word) => {
              return (
                <li key={word.id}>
                  <WordCard
                    word={word}
                    targetLang={targetLang}
                    clickable
                    showDefinition
                  />
                  <Separator className="my-2" />
                </li>
              );
            })}
          </>
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            No words found
          </li>
        )}
      </ul>
      <ListPagination
        className="my-5 flex justify-center"
        numPages={pagination.num_pages || 1}
        currentPage={page}
        next={!!pagination.next}
        prev={!!pagination.previous}
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
