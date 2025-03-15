'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phrase } from '@/types/phrases';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/entry/EntryHeader';
import EntryFooter from '@/components/entry/EntryFooter';
import Source from '@/components/hover-cards/Source';
import UsageNote from '@/components/hover-cards/UsageNote';
import CategoryHoverCard from '@/components/hover-cards/CategoryHoverCard';
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
  className?: string;
}

export default function PhraseCard({
  phrase,
  targetLang,
  clickable = true,
  className = '',
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      className={cn(
        className,
        `border-transparent shadow-none ${clickable && 'hover:bg-accent/40'}`
      )}
    >
      <CardHeader className="flex flex-row">
        <EntryHeader className="me-auto" entry={phrase} />
        <PhraseDropdownMenu phrase={phrase} setIsEditing={setIsEditing} />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UpdatePhraseForm phrase={phrase} setIsEditing={setIsEditing} />
        ) : (
          <>
            <Link href={`/phrases/${phrase.id}/`}>
              <p className="mb-1 whitespace-pre-line hover:text-primary">
                {phrase.content}
              </p>
            </Link>
            {targetLang && phrase.best_translations[targetLang] && (
              <Link href={`/phrases/${phrase.id}?tab=translations`}>
                <p className="text-sm bg-accent/50 text-accent-foreground hover:text-primary rounded-sm p-2 mb-1 whitespace-pre-line">
                  {phrase.best_translations[targetLang]}
                </p>
              </Link>
            )}
            <div className="flex flex-wrap gap-0 items-center">
              <div className="flex flex-wrap gap-1 items-center me-1">
                {phrase.categories.map((category) => (
                  <CategoryHoverCard name={category} key={category} />
                ))}
              </div>
              {(phrase.source_title || phrase.source_link) && (
                <Source
                  source_title={phrase.source_title}
                  source_link={phrase.source_link}
                />
              )}
              {phrase.usage_note && <UsageNote note={phrase.usage_note} />}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={phrase} />
      </CardFooter>
    </Card>
  );
}
