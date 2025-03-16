import React, { Suspense } from 'react';
import Link from 'next/link';
import getCategory from '@/lib/phrases/getCategory';
import getCategories from '@/lib/phrases/getCategories';
import PhrasesList, { PhrasesListSkeleton } from './PhrasesList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterOption } from '@/components/filter/FilterMenu';
import FilterControls from '@/components/filter/FilterControls';
import PhraseSearch from './PhraseSearch';
import LangFilter from '@/components/filter/LangFilter';
import CategoryCard from '@/components/cards/CategoryCard';
import GoogleTranslateCard from './GoogleTranslateCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { PlusIcon } from 'lucide-react';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function PhrasesPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const sourceLang = searchParams.sl || '';
  const targetLang = searchParams.tl || '';
  const categoryName = searchParams.category || '';
  const page = Number(searchParams.page || 1);

  const category = categoryName ? await getCategory(categoryName) : null;
  const categories = await getCategories();

  const filters = { category: categoryName };

  const sortingOptions: SortOption[] = [
    { label: 'Content', value: 'content' },
    { label: 'Votes ', value: '-vote_count' },
    { label: 'Translations', value: '-translation_count' },
    { label: 'Date updated ', value: '-updated_at' },
    { label: 'Date created', value: '-created_at' },
  ];

  const filterOptions: FilterOption[] = [
    {
      label: 'Category',
      name: 'category',
      type: 'select',
      options: categories.map(({ name }) => ({
        label: name,
        value: name,
      })),
    },
  ];

  return (
    <>
      <div className="p-2 rounded-lg border mb-2 focus-within:ring-1 focus-within:ring-primary">
        <PhraseSearch currentSearchTerm={searchTerm} />
        <div className="w-full flex gap-2 items-center">
          <LangFilter
            currentSourceLang={sourceLang}
            currentTargetLang={targetLang}
            className="me-auto"
          />
          <FilterControls
            sortOption={sortOption}
            sortingOptions={sortingOptions}
            filters={filters}
            filterOptions={filterOptions}
            className="!w-fit my-1"
          />
          <Button size="icon" className="rounded-full p-2 w-fit h-fit" asChild>
            <Link href="/phrases/submit/">
              <PlusIcon />
            </Link>
          </Button>
        </div>
      </div>

      <Separator className="my-2" />

      {category && <CategoryCard category={category} className="my-2" />}
      {searchTerm && sourceLang && targetLang && (
        <GoogleTranslateCard
          text={searchTerm}
          source={sourceLang}
          target={targetLang}
          className="my-1"
        />
      )}
      <Suspense fallback={<PhrasesListSkeleton />}>
        <PhrasesList
          sourceLang={sourceLang}
          targetLang={targetLang}
          searchTerm={searchTerm}
          sortOption={sortOption}
          filters={filters}
          page={page}
        />
      </Suspense>
    </>
  );
}
