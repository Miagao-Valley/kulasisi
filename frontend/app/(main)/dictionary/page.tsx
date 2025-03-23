import React, { Suspense } from 'react';
import Link from 'next/link';
import { getPartOfSpeech } from '@/lib/definitions/getPartOfSpeech';
import { getPartsOfSpeech } from '@/lib/definitions/getPartsOfSpeech';
import { WordsList, WordsListSkeleton } from './WordsList';
import { SortOption } from '@/components/filter/SortDropdown';
import { FilterOption } from '@/components/filter/FilterMenu';
import { FilterControls } from '@/components/filter/FilterControls';
import { WordSearch } from './WordSearch';
import { LangFilter } from '@/components/filter/LangFilter';
import { PosCard } from '@/components/cards/PosCard';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FeatherIcon } from 'lucide-react';

interface Props {
  searchParams: { [key: string]: string | undefined };
}

export default async function DictionaryPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';
  const sortOption = searchParams.sort || '-vote_count';
  const sourceLang = searchParams.sl || '';
  const targetLang = searchParams.tl || '';
  const posCode = searchParams.pos || '';
  const page = Number(searchParams.page || 1);

  const filters = { pos: posCode };

  const pos = posCode ? await getPartOfSpeech(posCode) : null;
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
      <div className="p-2 rounded-lg border mb-2 focus-within:ring-1 focus-within:ring-primary">
        <WordSearch currentSearchTerm={searchTerm} />
        <div className="w-full flex gap-2 items-center">
          <LangFilter
            currentSourceLang={sourceLang}
            currentTargetLang={targetLang}
          />
          <FilterControls
            sortOption={sortOption}
            sortingOptions={sortingOptions}
            filters={filters}
            filterOptions={filterOptions}
            className="!w-fit my-1"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="ms-auto rounded-full p-2 w-fit h-fit"
                asChild
              >
                <Link href="/contribute?tab=word">
                  <FeatherIcon />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add word</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Separator className="my-2" />

      {pos && <PosCard pos={pos} className="my-2" />}
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
