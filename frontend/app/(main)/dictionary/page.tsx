import React, { Suspense } from 'react';
import getPartsOfSpeech from '@/lib/definitions/getPartsOfSpeech';
import WordsList, { WordsListSkeleton } from './WordsList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterOption } from '@/components/filter/FilterMenu';
import FilterControls from '@/components/filter/FilterControls';
import WordSearch from './WordSearch';
import LangFilter from '@/components/filter/LangFilter';
import PosCard from './PosCard';
import GotoAddWord from './GotoAddWord';
import { Separator } from '@/components/ui/separator';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function DictionaryPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const sourceLang = searchParams.sl || '';
  const targetLang = searchParams.tl || '';
  const pos = searchParams.pos || '';
  const page = Number(searchParams.page || 1);

  const filters = { pos: pos };

  const partsOfSpeech = await getPartsOfSpeech();

  const sortingOptions: SortOption[] = [
    { label: 'Word', value: 'word' },
    { label: 'Votes ', value: '-vote_count' },
    { label: 'Date updated ', value: '-updated_at' },
    { label: 'Date created', value: '-created_at' },
  ];

  const filterOptions: FilterOption[] = [
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
      <WordSearch currentSearchTerm={searchTerm} />
      <div className="w-full flex justify-between">
        <LangFilter currentSourceLang={sourceLang} currentTargetLang={targetLang} />
        <FilterControls
          sortOption={sortOption}
          sortingOptions={sortingOptions}
          filters={filters}
          filterOptions={filterOptions}
          className="!w-fit my-1"
        />
      </div>
      <Separator className="my-2" />

      <GotoAddWord />
      <Separator className="my-2" />

      {filters.pos && <PosCard abbr={pos} className="my-2" />}
      <Suspense fallback={<WordsListSkeleton />}>
        <WordsList
          sourceLang={sourceLang}
          targetLang={targetLang}
          searchTerm={searchTerm}
          sortOption={sortOption}
          filters={filters}
          page={page}
        />
      </Suspense>
    </>
  );
}
