import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { CategoriesList, CategoriesListSkeleton } from './CategoriesList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterControls } from '@/components/filter/FilterControls';
import { H1 } from '@/components/ui/heading-with-anchor';

const sortingOptions: SortOption[] = [
  { label: 'Name', value: 'name' },
  { label: 'Description', value: 'description' },
];

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Search for categories of phrases.',
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
      <H1>Categories</H1>
      <FilterControls
        searchTerm={searchTerm}
        sortOption={sortOption}
        sortingOptions={sortingOptions}
        className="mb-4"
      />
      <Suspense fallback={<CategoriesListSkeleton />}>
        <CategoriesList searchTerm={searchTerm} sortOption={sortOption} />
      </Suspense>
    </>
  );
}
