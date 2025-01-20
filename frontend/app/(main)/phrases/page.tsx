import React, { Suspense } from 'react';
import getLangs from '@/lib/langs/getLangs';
import getCategories from '@/lib/phrases/getCategories';
import AddPhraseForm from './AddPhraseForm';
import PhrasesList, { PhrasesListSkeleton } from './PhrasesList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterOption } from '@/components/filter/FilterMenu';
import FilterControls from '@/components/filter/FilterControls';
import CategoryCard from './CategoryCard';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function PhrasesPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const lang = searchParams.lang || '';
  const category = searchParams.category || '';
  const page = Number(searchParams.page || 1);

  const langs = await getLangs();
  const categories = await getCategories();

  const filters = { lang: lang, category: category };

  const sortingOptions: SortOption[] = [
    { label: 'Content', value: 'content' },
    { label: 'Votes ', value: '-vote_count' },
    { label: 'Translations', value: '-translation_count' },
    { label: 'Date updated ', value: '-updated_at' },
    { label: 'Date created', value: '-created_at' },
  ];

  const filterOptions: FilterOption[] = [
    {
      label: 'Language',
      name: 'lang',
      type: 'select',
      options: langs.results.map(({ code, name }) => ({
        label: name,
        value: code,
      })),
    },
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
      <AddPhraseForm className="mb-4 py-2 border-t border-b" />
      <FilterControls
        searchTerm={searchTerm}
        sortOption={sortOption}
        sortingOptions={sortingOptions}
        filters={filters}
        filterOptions={filterOptions}
        className="my-1"
      />
      {filters.category &&
        <CategoryCard name={category} className="my-2" />
      }
      <Suspense fallback={<PhrasesListSkeleton />}>
        <PhrasesList
          searchTerm={searchTerm}
          sortOption={sortOption}
          filters={filters}
          page={page}
        />
      </Suspense>
    </>
  );
}
