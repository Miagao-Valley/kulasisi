import React, { Suspense } from 'react';
import { PosList, PosListSkeleton } from './PosList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterControls } from '@/components/filter/FilterControls';
import { H1 } from '@/components/ui/heading-with-anchor';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function LangsPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || 'name';

  const sortingOptions: SortOption[] = [
    { label: 'Abbreviation', value: 'abbr' },
    { label: 'Name', value: 'name' },
    { label: 'Description', value: 'description' },
  ];

  return (
    <>
      <H1>Parts of Speech</H1>
      <FilterControls
        searchTerm={searchTerm}
        sortOption={sortOption}
        sortingOptions={sortingOptions}
        className="mb-4"
      />
      <Suspense fallback={<PosListSkeleton />}>
        <PosList searchTerm={searchTerm} sortOption={sortOption} />
      </Suspense>
    </>
  );
}
