import React, { Suspense } from 'react';
import { UsersList, UsersListSkeleton } from './UsersList';
import { SortOption } from '@/components/filter/SortDropdown';
import { H1 } from '@/components/ui/heading-with-anchor';
import { FilterControls } from '@/components/filter/FilterControls';
import { Metadata } from 'next';

const sortingOptions: SortOption[] = [
  { label: 'Username', value: 'username' },
  { label: 'Reputation', value: '-reputation' },
  { label: 'Known languages', value: '-num_languages' },
  { label: 'Proficiency', value: '-avg_proficiency' },
  { label: 'Phrases', value: '-phrase_count' },
  { label: 'Translations', value: '-translation_count' },
  { label: 'Words', value: '-phrase_count' },
  { label: 'Definitions', value: '-definition_count' },
  { label: 'Votes', value: '-vote_count' },
  { label: 'Last seen', value: '-last_login' },
  { label: 'Date joined', value: '-date_joined' },
];

export const metadata: Metadata = {
  title: 'Users',
  description: 'Search for users that contribute to Kulasisi.',
};

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const { q: searchTerm = '', sort: sortOption = '-reputation' } =
    resolvedSearchParams;
  const page = Number(resolvedSearchParams.page || 1);

  return (
    <>
      <H1>Users</H1>
      <FilterControls
        searchTerm={searchTerm}
        sortOption={sortOption}
        sortingOptions={sortingOptions}
        className="mb-4"
      />
      <Suspense fallback={<UsersListSkeleton />}>
        <UsersList
          searchTerm={searchTerm}
          sortOption={sortOption}
          page={page}
        />
      </Suspense>
    </>
  );
}
