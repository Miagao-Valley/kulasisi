'use client';

import React, { useState, useEffect } from 'react';
import { Lang, PaginationDetails } from '@/types';
import getLangs from '@/lib/langs/getLangs';
import LangsList, { LangsListSkeleton } from './LangsList';
import SearchInput from '../components/SearchInput';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import FilterMenu, { Filter, FilterOption } from '../components/FilterMenu';

export default function LangsPage() {
  const [langs, setLangs] = useState<PaginationDetails & { results: Lang[] }>();
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [isDescending, setIsDescending] = useState(false);
  const [filters, setFilters] = useState<Filter>({});

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getLangs({
        search: searchTerm,
        ordering: isDescending ? `-${sortOption}` : sortOption,
      });
      setLangs(data);
    };

    fetch();
    setLoading(false);
  }, [searchTerm, sortOption, isDescending, filters]);

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
      {isLoading ? <LangsListSkeleton /> : <LangsList langs={langs} />}
    </>
  );
}
