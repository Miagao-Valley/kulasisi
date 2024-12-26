import React, { Suspense } from 'react';
import { Phrase } from '@/types/phrases';
import AddTranslationForm from './AddTranslationForm';
import TranslationsList, { TranslationsListSkeleton } from './TranslationsList';
import SearchInput from '@/app/components/SearchInput';
import SortDropdown, { SortOption } from '@/app/components/SortDropdown';
import FilterMenu, { FilterOption } from '@/app/components/FilterMenu';
import getLangs from '@/lib/langs/getLangs';

interface Props {
  phrase: Phrase;
  searchParams: { [key: string]: string | undefined };
}

export default async function TranslationsSection({
  searchParams,
  phrase,
}: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const lang = searchParams.lang || '';
  const page = Number(searchParams.page || 1);

  const filters = { lang: lang };

  const langs = await getLangs();

  const sortingOptions: SortOption[] = [
    { label: 'Content', value: 'content' },
    { label: 'Votes ', value: '-vote_count' },
    { label: 'Date updated ', value: '-updated_at' },
    { label: 'Date created', value: '-created_at' },
  ];

  const filterOptions: FilterOption[] = [
    {
      label: 'Language',
      value: 'lang',
      type: 'select',
      options: langs.results
        .filter(({ code }) => code !== phrase.lang)
        .map(({ code, name }) => ({ label: name, value: code })),
    },
  ];

  return (
    <>
      <hr />
      <AddTranslationForm
        phraseId={phrase.id}
        original_lang={phrase.lang}
        className="mx-1 my-2"
      />
      <hr className="mb-4" />
      <div className="mb-4 flex gap-3">
        <SearchInput currentSearchTerm={searchTerm} className="me-auto" />
        <SortDropdown
          currentSortOption={sortOption}
          sortingOptions={sortingOptions}
        />
        <FilterMenu currentFilters={filters} filterOptions={filterOptions} />
      </div>
      <Suspense fallback={<TranslationsListSkeleton />}>
        <TranslationsList
          phraseId={phrase.id}
          searchTerm={searchTerm}
          sortOption={sortOption}
          filters={filters}
          page={page}
        />
      </Suspense>
    </>
  );
}
