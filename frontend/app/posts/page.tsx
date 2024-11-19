import React, { Suspense } from 'react';
import AddTextEntryForm from './AddTextEntryForm';
import TextEntriesList, { TextEntriesListSkeleton } from './TextEntriesList';
import SearchInput from '../components/SearchInput';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import FilterMenu, { FilterOption } from '../components/FilterMenu';
import getLangs from '@/lib/langs/getLangs';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function PostsPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || 'content';
  const isDescending = searchParams?.isDescending === 'true';
  const lang = searchParams.lang || '';
  const page = Number(searchParams.page || 1);

  const filters = { lang: lang };

  const langs = await getLangs();

  const sortingOptions: SortOption[] = [
    { label: 'Content', value: 'content' },
    { label: 'Date updated ', value: 'updated_at' },
    { label: 'Date created', value: 'created_at' },
  ];

  const filterOptions: FilterOption[] = [
    {
      label: 'Language',
      value: 'lang',
      type: 'select',
      options: langs.results.map(({ code, name }) => ({
        label: name,
        value: code,
      })),
    },
  ];

  return (
    <>
      <h1>Posts</h1>
      <AddTextEntryForm className="mb-4" />
      <div className="mb-4 flex gap-3">
        <SearchInput currentSearchTerm={searchTerm} className="me-auto" />
        <SortDropdown
          currentSortOption={sortOption}
          currentIsDescending={isDescending}
          sortingOptions={sortingOptions}
        />
        <FilterMenu currentFilters={filters} filterOptions={filterOptions} />
      </div>
      <Suspense fallback={<TextEntriesListSkeleton />}>
        <TextEntriesList
          searchTerm={searchTerm}
          sortOption={sortOption}
          isDescending={isDescending}
          filters={filters}
          page={page}
        />
      </Suspense>
    </>
  );
}
