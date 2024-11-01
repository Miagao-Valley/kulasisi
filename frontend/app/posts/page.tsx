'use client';

import React, { useEffect, useState } from 'react';
import { TextEntry, PaginationDetails } from '@/types';
import getTextEntries from '@/lib/textEntries/getTextEntries';
import AddTextEntryForm from './AddTextEntryForm';
import TextEntriesList, { TextEntriesListSkeleton } from './TextEntriesList';
import SearchInput from '../components/SearchInput';
import SortDropdown, { SortOption } from '../components/SortDropdown';
import FilterMenu, { Filter, FilterOption } from '../components/FilterMenu';
import Pagination from '../components/Pagination';
import { Lang } from '@/types';
import getLangs from '@/lib/langs/getLangs';

export default function PostsPage() {
  const [langs, setLangs] = useState<Lang[]>([]);
  const [textEntries, setTextEntries] = useState<
    PaginationDetails & { results: TextEntry[] }
  >();
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('updated_at');
  const [isDescending, setIsDescending] = useState(true);
  const [filters, setFilters] = useState<Filter>({});
  const [offset, setOffset] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { results } = await getLangs();
      setLangs(results);
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getTextEntries({
        search: searchTerm,
        ordering: isDescending ? `-${sortOption}` : sortOption,
        lang__code: filters?.lang || '',
        limit: 15,
        offset: offset || '',
      });
      setTextEntries(data);
    };

    fetch();
    setLoading(false);
  }, [searchTerm, sortOption, isDescending, filters, offset]);

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
      {isLoading ? (
        <TextEntriesListSkeleton />
      ) : (
        <TextEntriesList textEntries={textEntries} />
      )}
      <Pagination
        className="my-5 flex justify-center"
        num_pages={textEntries?.num_pages || 1}
        current_page={textEntries?.current_page || 1}
        limit={textEntries?.limit || 1}
        next_offset={textEntries?.next?.offset ?? null}
        prev_offset={textEntries?.previous?.offset ?? null}
        setOffset={setOffset}
      />
    </>
  );
}
