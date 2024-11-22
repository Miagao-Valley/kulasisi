import React, { Suspense } from 'react';
import LangsList, { LangsListSkeleton } from './LangsList';
import SearchInput from '../components/SearchInput';
import SortDropdown, { SortOption } from '../components/SortDropdown';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function LangsPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || 'name';

  const sortingOptions: SortOption[] = [
    { label: 'Name', value: 'name' },
    { label: 'Speakers', value: '-user_count' },
    { label: 'Proficiency', value: '-avg_proficiency' },
    { label: 'Posts', value: '-text_entry_count' },
    { label: 'Translations', value: '-translation_count' },
  ];

  return (
    <>
      <h1>Languages</h1>
      <div className="mb-4 flex gap-3">
        <SearchInput currentSearchTerm={searchTerm} className="me-auto" />
        <SortDropdown
          currentSortOption={sortOption}
          sortingOptions={sortingOptions}
        />
      </div>
      <Suspense fallback={<LangsListSkeleton />}>
        <LangsList
          searchTerm={searchTerm}
          sortOption={sortOption}
        />
      </Suspense>
    </>
  );
}
