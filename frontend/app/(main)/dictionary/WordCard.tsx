'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Word } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/entry/EntryHeader';
import EntryFooter from '@/components/entry/EntryFooter';
import { LangHoverCard } from '@/components/cards/LangCard';
import Source from '@/components/cards/Source';
import { PosHoverCard } from '@/components/cards/PosCard';
import WordDropdownMenu from './WordDropdownMenu';
import UpdateWordForm from './UpdateWordForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { BookAIcon } from 'lucide-react';

interface Props {
  word: Word;
  targetLang?: string;
  clickable?: boolean;
  showDefinition?: boolean;
  className?: string;
}

export default function WordCard({
  word,
  targetLang,
  clickable = false,
  showDefinition = false,
  className = '',
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      className={cn(
        className,
        `flex flex-col gap-1 border-transparent ${
          clickable && 'hover:bg-accent/40'
        }`
      )}
    >
      <CardHeader className="flex flex-row items-center space-y-0 p-0 m-0">
        <div className="flex items-center gap-2 me-auto">
          <EntryHeader entry={word} />
          <BookAIcon className="w-4 h-4 text-muted-foreground" />
        </div>
        <WordDropdownMenu word={word} setIsEditing={setIsEditing} />
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <UpdateWordForm word={word} setIsEditing={setIsEditing} />
        ) : (
          <>
            <Link href={`/dictionary/${word.lang}/${word.word}/`}>
              <p className="mb-1 break-all text-wrap text-lg font-bold hover:text-primary">
                {word.word}
              </p>
            </Link>

            <div className="flex flex-wrap gap-1 items-center">
              {(word.source_title || word.source_link) && (
                <Source
                  source_title={word.source_title}
                  source_link={word.source_link}
                />
              )}

              <div className="flex flex-wrap gap-1 items-center me-1">
                {word.parts_of_speech.map((pos) => (
                  <PosHoverCard abbr={pos} key={pos} />
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter>
        <EntryFooter entry={word} />
      </CardFooter>

      {showDefinition && (
        <DefinitionPreview word={word} targetLang={targetLang} />
      )}
    </Card>
  );
}

function DefinitionPreview({
  word,
  targetLang,
}: {
  word: Word;
  targetLang?: string;
}) {
  return (
    <>
      {Object.keys(word.best_definitions ?? {}).length > 0 && (
        <div className="flex flex-col gap-1 text-xs bg-accent/20 rounded-sm p-2 px-3">
          <div>
            <span className="text-muted-foreground">
              {word.definition_count}
            </span>{' '}
            <span className="font-semibold">Definitions</span>
          </div>

          <div className="flex items-center gap-1">
            {(() => {
              const definitions = word.best_definitions;
              const selectedLang =
                targetLang && definitions[targetLang]
                  ? targetLang
                  : Object.keys(definitions)[0];
              const selectedDefinition = definitions[selectedLang];

              return (
                <>
                  <LangHoverCard code={selectedLang} />
                  <Link
                    href={`/dictionary/${word.lang}/${word.word}?tab=definitions`}
                    className="hover:text-primary text-wrap truncate"
                  >
                    {selectedDefinition}
                  </Link>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}
