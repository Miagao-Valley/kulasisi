'use client';

import React, { useState } from 'react';
import LangsList from './LangsList';
import SearchInput from '../components/SearchInput';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import FilterMenu, { Filter, FilterOption } from '../components/FilterMenu';

export default function LangsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [isDescending, setIsDescending] = useState(false);
  const [filters, setFilters] = useState<Filter>({});

  const sortingOptions: SortOption[] = [
    { label: 'Name', value: 'name' },
    { label: 'Code', value: 'code' },
  ];

  const filterOptions: FilterOption[] = [];

  return (
    <>
      <h1>Languages</h1>
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
      <LangsList
        searchTerm={searchTerm}
        sortOption={sortOption}
        isDescending={isDescending}
        filters={filters}
      />
    </>
  );
}
