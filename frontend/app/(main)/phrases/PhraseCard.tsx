'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phrase } from '@/types/phrases';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/entry/EntryHeader';
import EntryFooter from '@/components/entry/EntryFooter';
import { LangHoverCard } from '@/components/cards/LangCard';
import Source from '@/components/cards/Source';
import UsageNote from '@/components/cards/UsageNote';
import { CategoryHoverCard } from '@/components/cards/CategoryCard';
import PhraseDropdownMenu from './PhraseDropdownMenu';
import UpdatePhraseForm from './UpdatePhraseForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface Props {
  phrase: Phrase;
  targetLang?: string;
  clickable?: boolean;
  showTranslation?: boolean;
  className?: string;
}

export default function PhraseCard({
  phrase,
  targetLang,
  clickable = false,
  showTranslation = false,
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
          <EntryHeader entry={phrase} />
        </div>
        <PhraseDropdownMenu phrase={phrase} setIsEditing={setIsEditing} />
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <UpdatePhraseForm phrase={phrase} setIsEditing={setIsEditing} />
        ) : (
          <>
            <Link href={`/phrases/${phrase.id}/`}>
              <p className="mb-1 text-wrap whitespace-pre-line hover:text-primary">
                {phrase.content}
              </p>
            </Link>

            <div className="flex flex-wrap gap-1 items-center">
              {phrase.usage_note && <UsageNote note={phrase.usage_note} />}

              {(phrase.source_title || phrase.source_link) && (
                <Source
                  source_title={phrase.source_title}
                  source_link={phrase.source_link}
                />
              )}

              <div className="flex flex-wrap gap-1 items-center me-1">
                {phrase.categories.map((category) => (
                  <CategoryHoverCard name={category} key={category} />
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter className="flex items-center gap-2">
        <EntryFooter entry={phrase} />
      </CardFooter>

      {showTranslation && (
        <TranslationsPreview phrase={phrase} targetLang={targetLang} />
      )}
    </Card>
  );
}

function TranslationsPreview({
  phrase,
  targetLang,
}: {
  phrase: Phrase;
  targetLang?: string;
}) {
  return (
    <>
      {Object.keys(phrase.best_translations ?? {}).length > 0 && (
        <div className="flex flex-col gap-1 text-xs bg-accent/20 rounded-sm p-2 px-3">
          <div>
            <span className="text-muted-foreground">
              {phrase.translation_count}
            </span>{' '}
            <span className="font-semibold">Translations</span>
          </div>

          <div className="flex items-center gap-1">
            {(() => {
              const translations = phrase.best_translations;
              const selectedLang =
                targetLang && translations[targetLang]
                  ? targetLang
                  : Object.keys(translations)[0];
              const selectedTranslation = translations[selectedLang];

              return (
                <>
                  <LangHoverCard code={selectedLang} />
                  <Link
                    href={`/phrases/${phrase.id}?tab=translations`}
                    className="hover:text-primary text-wrap truncate w-full"
                  >
                    {selectedTranslation}
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
