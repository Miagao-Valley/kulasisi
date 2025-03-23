import { getTranslations } from '@/lib/translations/getTranslations';
import { cn } from '@/lib/utils';
import { TranslationCard } from './TranslationCard';
import { ListPagination } from '@/components/pagination/ListPagination';
import { Filter } from '@/components/filter/FilterMenu';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

interface Props {
  phraseId?: number;
  searchTerm?: string;
  sortOption?: string;
  filters?: Filter;
  page?: number;
  className?: string;
}

export async function TranslationsList({
  phraseId,
  searchTerm = '',
  sortOption = 'content',
  filters = {},
  page = 1,
  className = '',
}: Props) {
  const limit = 15;

  const { results: translations, pagination } = await getTranslations(
    phraseId,
    {
      search: searchTerm,
      ordering: sortOption,
      lang__code: filters?.lang,
      contributor__username: filters?.contributor,
      limit: limit,
      offset: limit * (page - 1),
    }
  );

  return (
    <>
      <ul className={cn(className, 'flex flex-col')}>
        {translations.length > 0 ? (
          <>
            {translations.map(async (translation) => {
              return (
                <li key={translation.id}>
                  <Separator className="my-2" />
                  <div id={`translation-${translation.id}`}>
                    <TranslationCard translation={translation} />
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

export function TranslationsListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul className={cn(className, 'flex flex-col gap-3')}>
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton className="h-36 rounded-xl" key={i}></Skeleton>
      ))}
    </ul>
  );
}
