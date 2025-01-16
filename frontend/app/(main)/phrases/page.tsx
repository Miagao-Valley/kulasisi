import React, { Suspense } from 'react';
import getLangs from '@/lib/langs/getLangs';
import AddPhraseForm from './AddPhraseForm';
import PhrasesList, { PhrasesListSkeleton } from './PhrasesList';
import { SortOption } from '@/components/SortDropdown';
import { FilterOption } from '@/components/FilterMenu';
import FilterControls from '@/components/FilterControls';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function PhrasesPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const lang = searchParams.lang || '';
  const page = Number(searchParams.page || 1);

  const langs = await getLangs();

  const filters = { lang: lang };

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
      />
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
