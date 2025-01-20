import React, { Suspense } from 'react';
import getLangs from '@/lib/langs/getLangs';
import AddWordForm from './AddWordForm';
import WordsList, { WordsListSkeleton } from './WordsList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterOption } from '@/components/filter/FilterMenu';
import FilterControls from '@/components/filter/FilterControls';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function DictionaryPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const lang = searchParams.lang || '';
  const page = Number(searchParams.page || 1);

  const filters = { lang: lang };

  const langs = await getLangs();

  const sortingOptions: SortOption[] = [
    { label: 'Word', value: 'word' },
    { label: 'Votes ', value: '-vote_count' },
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
      <AddWordForm className="py-2 mb-4 border-t border-b" />
      <FilterControls
        searchTerm={searchTerm}
        sortOption={sortOption}
        sortingOptions={sortingOptions}
        filters={filters}
        filterOptions={filterOptions}
      />
      <Suspense fallback={<WordsListSkeleton />}>
        <WordsList
          searchTerm={searchTerm}
          sortOption={sortOption}
          filters={filters}
          page={page}
        />
      </Suspense>
    </>
  );
}
