import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { PosList, PosListSkeleton } from './PosList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterControls } from '@/components/filter/FilterControls';
import { H1 } from '@/components/ui/heading-with-anchor';

const sortingOptions: SortOption[] = [
  { label: 'Abbreviation', value: 'abbr' },
  { label: 'Name', value: 'name' },
  { label: 'Description', value: 'description' },
];

export const metadata: Metadata = {
  title: 'Parts of Speech',
  description: 'Search for parts of speech of words.',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function LangsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const { q: searchTerm = '', sort: sortOption = 'name' } =
    resolvedSearchParams;

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
