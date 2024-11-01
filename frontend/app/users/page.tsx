'use client';

import React, { useState, useEffect } from 'react';
import { User, PaginationDetails } from '@/types';
import getUsers from '@/lib/users/getUsers';
import UsersList, { UsersListSkeleton } from './UsersList';
import SearchInput from '../components/SearchInput';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import FilterMenu, { Filter, FilterOption } from '../components/FilterMenu';
import Pagination from '../components/Pagination';

export default function UsersPage() {
  const [users, setUsers] = useState<PaginationDetails & { results: User[] }>();
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('username');
  const [isDescending, setIsDescending] = useState(false);
  const [filters, setFilters] = useState<Filter>({});
  const [offset, setOffset] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getUsers({
        search: searchTerm,
        ordering: isDescending ? `-${sortOption}` : sortOption,
        is_staff: filters?.is_staff ? 'true' : '',
        limit: 50,
        offset: offset || '',
      });
      setUsers(data);
    };

    fetch();
    setLoading(false);
  }, [searchTerm, sortOption, isDescending, filters, offset]);

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
      {isLoading ? <UsersListSkeleton /> : <UsersList users={users} />}
      <Pagination
        className="my-5 flex justify-center"
        num_pages={users?.num_pages || 1}
        current_page={users?.current_page || 1}
        limit={users?.limit || 1}
        next_offset={users?.next?.offset ?? null}
        prev_offset={users?.previous?.offset ?? null}
        setOffset={setOffset}
      />
    </>
  );
}
