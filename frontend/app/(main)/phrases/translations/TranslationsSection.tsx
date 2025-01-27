import React, { Suspense } from 'react';
import { Phrase } from '@/types/phrases';
import getLangs from '@/lib/langs/getLangs';
import AddTranslationForm from './AddTranslationForm';
import TranslationsList, { TranslationsListSkeleton } from './TranslationsList';
import GoogleTranslateCard from '../GoogleTranslateCard';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterOption } from '@/components/filter/FilterMenu';
import FilterControls from '@/components/filter/FilterControls';

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

  const langs = await getLangs();

  const filters = { lang: lang };

  const sortingOptions: SortOption[] = [
    { label: 'Content', value: 'content' },
    { label: 'Votes ', value: '-vote_count' },
    { label: 'Date updated ', value: '-updated_at' },
    { label: 'Date created', value: '-created_at' },
  ];

  const filterOptions: FilterOption[] = [
    {
      label: 'Language',
      name: 'lang',
      type: 'select',
      options: langs.results
        .filter(({ code }) => code !== phrase.lang)
        .map(({ code, name }) => ({ label: name, value: code })),
    },
  ];

  return (
    <>
      <AddTranslationForm
        phraseId={phrase.id}
        originalLang={phrase.lang}
        className="py-2 mb-4 border-t border-b"
      />
      <FilterControls
        searchTerm={searchTerm}
        sortOption={sortOption}
        sortingOptions={sortingOptions}
        filters={filters}
        filterOptions={filterOptions}
        className="my-1"
      />
      {(phrase.content && phrase.lang && filters.lang) &&
        <GoogleTranslateCard text={phrase.content} source={phrase.lang} target={filters.lang} className="my-1" />
      }
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
