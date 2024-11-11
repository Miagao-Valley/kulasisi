'use client';

import React, { useEffect, useState } from 'react';
import { TextEntry, PaginationDetails, Translation } from '@/types';
import getTranslations from '@/lib/translations/getTranslations';
import AddTranslationForm from './AddTranslationForm';
import TranslationsList, { TranslationsListSkeleton } from './TranslationsList';
import SearchInput from '@/app/components/SearchInput';
import SortDropdown, { SortOption } from '@/app/components/SortDropdown';
import FilterMenu, { Filter, FilterOption } from '@/app/components/FilterMenu';
import Pagination from '@/app/components/Pagination';
import { Lang } from '@/types';
import getLangs from '@/lib/langs/getLangs';

interface Props {
  textEntry: TextEntry;
}

export default function TranslationsSection({ textEntry }: Props) {
  const [langs, setLangs] = useState<Lang[]>([]);
  const [translations, setTranslations] = useState<
    PaginationDetails & { results: Translation[] }
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
      const data = await getTranslations(
        {
          search: searchTerm,
          ordering: isDescending ? `-${sortOption}` : sortOption,
          lang__code: filters?.lang || '',
          limit: 15,
          offset: offset || '',
        },
        textEntry.id,
      );
      setTranslations(data);
    };

    fetch();
    setLoading(false);
  }, [searchTerm, sortOption, isDescending, filters, offset, textEntry.id]);

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
      options: langs
        .filter(({ code }) => code !== textEntry.lang)
        .map(({ code, name }) => ({ label: name, value: code })),
    },
  ];

  return (
    <>
      <AddTranslationForm
        textEntryId={textEntry.id}
        original_lang={textEntry.lang}
        className="mb-4"
      />
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
        <TranslationsListSkeleton />
      ) : (
        <TranslationsList translations={translations} />
      )}
      <Pagination
        className="my-5 flex justify-center"
        num_pages={translations?.num_pages || 1}
        current_page={translations?.current_page || 1}
        limit={translations?.limit || 1}
        next_offset={translations?.next?.offset ?? null}
        prev_offset={translations?.previous?.offset ?? null}
        setOffset={setOffset}
      />
    </>
  );
}
