import getCategories from '@/lib/phrases/getCategories';
import { cn } from '@/lib/utils';
import CategoryCard from '@/components/cards/CategoryCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  searchTerm: string;
  sortOption: string;
  className?: string;
}

export default async function CategoriesList({
  searchTerm,
  sortOption,
  className = '',
}: Props) {
  const categories = await getCategories({
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
      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <li key={category.name}>
            <CategoryCard category={category} className="w-full h-full" />
          </li>
        ))
      ) : (
        <li className="w-full col-span-full text-center p-3">
          No categories found
        </li>
      )}
    </ul>
  );
}

interface SkeletonProps {
  className?: string;
}

export function CategoriesListSkeleton({ className = '' }: SkeletonProps) {
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
