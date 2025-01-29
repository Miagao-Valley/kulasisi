import React, { Suspense } from 'react';
import getCategories from '@/lib/phrases/getCategories';
import PhrasesList, { PhrasesListSkeleton } from './PhrasesList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterOption } from '@/components/filter/FilterMenu';
import FilterControls from '@/components/filter/FilterControls';
import CategoryCard from './CategoryCard';
import PhraseSearch from './PhraseSearch';
import LangFilter from '@/components/filter/LangFilter';
import GoogleTranslateCard from './GoogleTranslateCard';
import GotoAddPhrase from './GotoAddPhrase';
import { Separator } from '@/components/ui/separator';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function PhrasesPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const sourceLang = searchParams.sl || '';
  const targetLang = searchParams.tl || '';
  const category = searchParams.category || '';
  const page = Number(searchParams.page || 1);

  const categories = await getCategories();

  const filters = { category: category };

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
      <PhraseSearch currentSearchTerm={searchTerm} />
      <div className="w-full flex justify-between">
        <LangFilter currentSourceLang={sourceLang} currentTargetLang={targetLang} />
        <FilterControls
          sortOption={sortOption}
          sortingOptions={sortingOptions}
          filters={filters}
          filterOptions={filterOptions}
          className="!w-fit my-1"
        />
      </div>
      <Separator className="my-2" />

      <GotoAddPhrase />
      <Separator className="my-2" />

      {filters.category && <CategoryCard name={category} className="my-2" />}
      {(searchTerm && sourceLang && targetLang) &&
        <GoogleTranslateCard text={searchTerm} source={sourceLang} target={targetLang} className="my-1" />
      }
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
