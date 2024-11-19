import React, { Suspense } from 'react';
import UsersList, { UsersListSkeleton } from './UsersList';
import SearchInput from '../components/SearchInput';
import SortDropdown, { SortOption } from '../components/SortDropdown';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function UsersPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || 'username';
  const isDescending = searchParams?.isDescending === 'true';
  const page = Number(searchParams.page || 1);

  const sortingOptions: SortOption[] = [
    { label: 'Username', value: 'username' },
    { label: 'Last seen', value: 'last_login' },
    { label: 'Date joined', value: 'date_joined' },
  ];

  return (
    <>
      <h1>Users</h1>
      <div className="mb-4 flex gap-3">
        <SearchInput currentSearchTerm={searchTerm} className="me-auto" />
        <SortDropdown
          currentSortOption={sortOption}
          currentIsDescending={isDescending}
          sortingOptions={sortingOptions}
        />
      </div>
      <Suspense fallback={<UsersListSkeleton />}>
        <UsersList
          searchTerm={searchTerm}
          sortOption={sortOption}
          isDescending={isDescending}
          page={page}
        />
      </Suspense>
    </>
  );
}
