'use client';

import React, { useEffect, useState } from 'react';
import AddTextEntryForm from './AddTextEntryForm';
import TextEntriesList from './TextEntriesList';
import SearchInput from '../components/SearchInput';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import FilterMenu, { Filter, FilterOption } from '../components/FilterMenu';
import { Lang } from '@/types';
import getLangs from '@/lib/langs/getLangs';

export default function PostsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('updated_at');
  const [isDescending, setIsDescending] = useState(true);
  const [filters, setFilters] = useState<Filter>({});
  const [langs, setLangs] = useState<Lang[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getLangs();
      setLangs(data);
    };

    fetch();
  }, []);

  const sortingOptions: SortOption[] = [
    { label: 'Content', value: 'content' },
    { label: 'Date updated ', value: 'updated_at' },
    { label: 'Date created', value: 'created_at' },
  ];

  const filterOptions: FilterOption[] = [
    {
      label: 'Language',
      value: 'lang',
      type: 'select',
      options: langs.map(({ code, name }) => ({ label: name, value: code })),
    },
  ];

  return (
    <>
      <h1>Posts</h1>
      <AddTextEntryForm className="mb-4" />
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
      <TextEntriesList
        searchTerm={searchTerm}
        sortOption={sortOption}
        isDescending={isDescending}
        filters={filters}
      />
    </>
  );
}
