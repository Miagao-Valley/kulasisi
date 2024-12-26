import React, { Suspense } from 'react';
import { DictEntry } from '@/types';
import AddDefinitionForm from './AddDefinitionForm';
import DefinitionsList, { DefinitionsListSkeleton } from './DefinitionsList';
import SearchInput from '@/app/components/SearchInput';
import SortDropdown, { SortOption } from '@/app/components/SortDropdown';
import FilterMenu, { FilterOption } from '@/app/components/FilterMenu';
import getLangs from '@/lib/langs/getLangs';

interface Props {
  dictEntry: DictEntry;
  searchParams: { [key: string]: string | undefined };
}

export default async function DefinitionsSection({
  searchParams,
  dictEntry,
}: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const lang = searchParams.lang || '';
  const page = Number(searchParams.page || 1);

  const filters = { lang: lang };

  const langs = await getLangs();

  const sortingOptions: SortOption[] = [
    { label: 'Description', value: 'description' },
    { label: 'Votes ', value: '-vote_count' },
    { label: 'Date updated ', value: '-updated_at' },
    { label: 'Date created', value: '-created_at' },
  ];

  const filterOptions: FilterOption[] = [
    {
      label: 'Language',
      value: 'lang',
      type: 'select',
      options: langs.results
        .filter(({ code }) => code !== dictEntry.lang)
        .map(({ code, name }) => ({ label: name, value: code })),
    },
  ];

  return (
    <>
      <hr />
      <AddDefinitionForm
        dictEntryId={dictEntry.id}
        original_lang={dictEntry.lang}
        className="mx-1 my-2"
      />
      <hr className="mb-4" />
      <div className="mb-4 flex gap-3">
        <SearchInput currentSearchTerm={searchTerm} className="me-auto" />
        <SortDropdown
          currentSortOption={sortOption}
          sortingOptions={sortingOptions}
        />
        <FilterMenu currentFilters={filters} filterOptions={filterOptions} />
      </div>
      <Suspense fallback={<DefinitionsListSkeleton />}>
        <DefinitionsList
          dictEntryId={dictEntry.id}
          searchTerm={searchTerm}
          sortOption={sortOption}
          filters={filters}
          page={page}
        />
      </Suspense>
    </>
  );
}
