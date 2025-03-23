import React, { Suspense } from 'react';
import { Word } from '@/types/dictionary';
import { AddDefinitionForm } from './AddDefinitionForm';
import { DefinitionsList, DefinitionsListSkeleton } from './DefinitionsList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterOption } from '@/components/filter/FilterMenu';
import { getLangs } from '@/lib/langs/getLangs';
import { getPartsOfSpeech } from '@/lib/definitions/getPartsOfSpeech';
import { FilterControls } from '@/components/filter/FilterControls';

interface Props {
  word: Word;
  searchParams: { [key: string]: string | undefined };
}

export async function DefinitionsSection({ searchParams, word }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const lang = searchParams.lang || '';
  const pos = searchParams.pos || '';
  const page = Number(searchParams.page || 1);

  const { results: langs } = await getLangs();
  const partsOfSpeech = await getPartsOfSpeech();

  const filters = { lang: lang, pos: pos };

  const sortingOptions: SortOption[] = [
    { label: 'Description', value: 'description' },
    { label: 'POS ', value: 'pos__abbr' },
    { label: 'Votes ', value: '-vote_count' },
    { label: 'Date updated ', value: '-updated_at' },
    { label: 'Date created', value: '-created_at' },
  ];

  const filterOptions: FilterOption[] = [
    {
      label: 'Language',
      name: 'lang',
      type: 'select',
      options: langs
        .filter(({ code }) => code !== word.lang)
        .map(({ code, name }) => ({ label: name, value: code })),
    },
    {
      label: 'POS',
      name: 'pos',
      type: 'select',
      options: partsOfSpeech.map(({ abbr, name }) => ({
        label: name,
        value: abbr,
      })),
    },
  ];

  return (
    <>
      <AddDefinitionForm
        wordLang={word.lang}
        word={word.word}
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
      <Suspense fallback={<DefinitionsListSkeleton />}>
        <DefinitionsList
          wordLang={word.lang}
          word={word.word}
          searchTerm={searchTerm}
          sortOption={sortOption}
          filters={filters}
          page={page}
        />
      </Suspense>
    </>
  );
}
