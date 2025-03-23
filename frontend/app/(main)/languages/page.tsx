import React, { Suspense } from 'react';
import { LangsList, LangsListSkeleton } from './LangsList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterControls } from '@/components/filter/FilterControls';
import { H1 } from '@/components/ui/heading-with-anchor';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function LangsPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-user_count';

  const sortingOptions: SortOption[] = [
    { label: 'Name', value: 'name' },
    { label: 'Members', value: '-user_count' },
    { label: 'Proficiency', value: '-avg_proficiency' },
    { label: 'Phrases', value: '-phrase_count' },
    { label: 'Translations', value: '-translation_count' },
    { label: 'Words', value: '-word_count' },
    { label: 'Definitions', value: '-definition_count' },
  ];

  return (
    <>
      <H1>Languages</H1>
      <FilterControls
        searchTerm={searchTerm}
        sortOption={sortOption}
        sortingOptions={sortingOptions}
        className="mb-4"
      />
      <Suspense fallback={<LangsListSkeleton />}>
        <LangsList searchTerm={searchTerm} sortOption={sortOption} />
      </Suspense>
    </>
  );
}
