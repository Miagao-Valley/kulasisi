'use client';

import React, { useState } from 'react';
import UsersList from './UsersList';
import SearchInput from '../components/SearchInput';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import FilterMenu, { Filter, FilterOption } from '../components/FilterMenu';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('username');
  const [isDescending, setIsDescending] = useState(false);
  const [filters, setFilters] = useState<Filter>({});

  const sortingOptions: SortOption[] = [
    { label: 'Username', value: 'username' },
    { label: 'Last seen', value: 'last_login' },
    { label: 'Date joined', value: 'date_joined' },
  ];

  const filterOptions: FilterOption[] = [
    { label: 'Staff', value: 'is_staff', type: 'checkbox' },
  ];

  return (
    <>
      <h1>Users</h1>
      <div className="mb-4 flex gap-3">
        <SearchInput
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          className="me-auto"
        />
        <SortDropdown
          sortOption={sortOption}
          setSortOption={setSortOption}
          isDescending={isDescending}
          setIsDescending={setIsDescending}
          sortingOptions={sortingOptions}
        />
        <FilterMenu
          filterOptions={filterOptions}
          setFilters={setFilters}
          currentFilters={filters}
        />
      </div>
      <UsersList
        searchTerm={searchTerm}
        sortOption={sortOption}
        isDescending={isDescending}
        filters={filters}
      />
    </>
  );
}
