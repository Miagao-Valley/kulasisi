import getDefinitions from '@/lib/definitions/getDefinitions';
import { cn } from '@/lib/utils';
import DefinitionCard from './DefinitionCard';
import ListPagination from '@/components/pagination/ListPagination';
import { Filter } from '@/components/filter/FilterMenu';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface Props {
  wordLang?: string;
  word?: string;
  searchTerm?: string;
  sortOption?: string;
  filters?: Filter;
  page?: number;
  className?: string;
}

export default async function DefinitionsList({
  wordLang,
  word,
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const definitions = await getDefinitions(wordLang, word, {
    search: searchTerm,
    ordering: sortOption,
    lang__code: filters?.lang,
    contributor__username: filters?.contributor,
    pos__abbr: filters?.pos,
    limit: limit,
    offset: limit * (page - 1),
  });

  return (
    <>
      <ul className={cn(className, 'flex flex-col')}>
        {definitions &&
        definitions.results &&
        definitions.results.length > 0 ? (
          <>
            {definitions.results.map(async (definition) => {
              return (
                <li key={definition.id}>
                  <Separator className="my-2" />
                  <div id={`definition-${definition.id}`}>
                    <DefinitionCard definition={definition} />
                  </div>
                </li>
              );
            })}
            <Separator className="my-2" />
          </>
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            No definitions found
          </li>
        )}
      </ul>
      <ListPagination
        className="my-5 flex justify-center"
        numPages={definitions?.num_pages || 1}
        currentPage={page}
        next={!!definitions?.next}
        prev={!!definitions?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function DefinitionsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={cn(className, 'flex flex-col gap-3')}>
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton className="h-36 rounded-xl" key={i}></Skeleton>
      ))}
    </ul>
  );
}
