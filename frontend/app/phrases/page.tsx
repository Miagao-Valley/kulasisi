import React, { Suspense } from 'react';
import getLangs from '@/lib/langs/getLangs';
import AddPhraseForm from './AddPhraseForm';
import PhrasesList, { PhrasesListSkeleton } from './PhrasesList';
import SearchInput from '@/components/SearchInput';
import SortDropdown, { SortOption } from '@/components/SortDropdown';
import FilterMenu, { FilterOption } from '@/components/FilterMenu';

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
      <AddPhraseForm className="py-2 mb-4 border-t border-b" />
      <div className="mb-4 flex gap-2">
        <SearchInput currentSearchTerm={searchTerm} className="me-auto" />
        <SortDropdown currentSortOption={sortOption} sortingOptions={sortingOptions} />
        <FilterMenu currentFilters={filters} filterOptions={filterOptions} />
      </div>
      <Suspense fallback={<PhrasesListSkeleton />}>
        <PhrasesList searchTerm={searchTerm} sortOption={sortOption} filters={filters} page={page} />
      </Suspense>
    </>
  );
}
