import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getCategory } from '@/lib/phrases/getCategory';
import { getCategories } from '@/lib/phrases/getCategories';
import { PhrasesList, PhrasesListSkeleton } from './PhrasesList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterOption } from '@/components/filter/FilterMenu';
import { FilterControls } from '@/components/filter/FilterControls';
import { PhraseSearch } from './PhraseSearch';
import { LangFilter } from '@/components/filter/LangFilter';
import { CategoryCard } from '@/components/cards/CategoryCard';
import { GoogleTranslateCard } from './GoogleTranslateCard';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FeatherIcon } from 'lucide-react';

const sortingOptions: SortOption[] = [
  { label: 'Content', value: 'content' },
  { label: 'Votes ', value: '-vote_count' },
  { label: 'Translations', value: '-translation_count' },
  { label: 'Date updated ', value: '-updated_at' },
  { label: 'Date created', value: '-created_at' },
];

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const { sl: sourceLang = '', category: categoryName = '' } =
    resolvedSearchParams;

  return {
    title: `${categoryName && '#' + categoryName + ' | '}${
      sourceLang && sourceLang.toUpperCase() + ' '
    }Phrasebook`,
    description: 'Search for phrases and their translations.',
  };
}

export default async function PhrasesPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const {
    q: searchTerm = '',
    sort: sortOption = '-vote_count',
    sl: sourceLang = '',
    tl: targetLang = '',
    category: categoryName = '',
  } = resolvedSearchParams;
  const page = Number(resolvedSearchParams.page || 1);

  const category = categoryName ? await getCategory(categoryName) : null;
  const categories = await getCategories();

  const filters = { category: categoryName };
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
          />
          <FilterControls
            sortOption={sortOption}
            sortingOptions={sortingOptions}
            filters={filters}
            filterOptions={filterOptions}
            className="w-fit! my-1"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="ms-auto rounded-full p-2 w-fit h-fit"
                asChild
              >
                <Link href="/contribute?tab=phrase">
                  <FeatherIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add phrase</TooltipContent>
          </Tooltip>
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
