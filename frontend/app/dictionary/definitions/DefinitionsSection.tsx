import React, { Suspense } from 'react';
import { Word } from '@/types/dictionary';
import AddDefinitionForm from './AddDefinitionForm';
import DefinitionsList, { DefinitionsListSkeleton } from './DefinitionsList';
import SearchInput from '@/components/SearchInput';
import SortDropdown, { SortOption } from '@/components/SortDropdown';
import FilterMenu, { FilterOption } from '@/components/FilterMenu';
import getLangs from '@/lib/langs/getLangs';

interface Props {
  word: Word;
  searchParams: { [key: string]: string | undefined };
}

export default async function DefinitionsSection({
  searchParams,
  word,
}: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const lang = searchParams.lang || '';
  const page = Number(searchParams.page || 1);

  const langs = await getLangs();

  const filters = { lang: lang };

  const sortingOptions: SortOption[] = [
    { label: 'Description', value: 'description' },
    { label: 'Votes ', value: '-vote_count' },
    { label: 'Date updated ', value: '-updated_at' },
    { label: 'Date created', value: '-created_at' },
  ];

  const filterOptions: FilterOption[] = [
    {
      label: 'Language',
      name: 'lang',
      type: 'select',
      options: langs.results
        .filter(({ code }) => code !== word.lang)
        .map(({ code, name }) => ({ label: name, value: code })),
    },
  ];

  return (
    <>
      <AddDefinitionForm
        wordId={word.id}
        originalLang={word.lang}
        className="py-2 mb-4 border-t border-b"
      />
      <div className="mb-4 flex gap-2">
        <SearchInput currentSearchTerm={searchTerm} className="me-auto" />
        <SortDropdown
          currentSortOption={sortOption}
          sortingOptions={sortingOptions}
        />
        <FilterMenu currentFilters={filters} filterOptions={filterOptions} />
      </div>
      <Suspense fallback={<DefinitionsListSkeleton />}>
        <DefinitionsList
          wordId={word.id}
          searchTerm={searchTerm}
          sortOption={sortOption}
          filters={filters}
          page={page}
        />
      </Suspense>
    </>
  );
}
