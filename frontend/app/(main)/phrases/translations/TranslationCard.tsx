'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Translation } from '@/types/phrases';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/entry/EntryHeader';
import EntryFooter from '@/components/entry/EntryFooter';
import Source from '@/components/cards/Source';
import TranslationDropdownMenu from './TranslationDropdownMenu';
import UpdateTranslationForm from './UpdateTranslationForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface Props {
  translation: Translation;
  clickable?: boolean;
  className?: string;
}

export default function TranslationCard({
  translation,
  clickable = true,
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
          <EntryHeader entry={translation} />
        </div>
        <TranslationDropdownMenu
          translation={translation}
          setIsEditing={setIsEditing}
        />
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <UpdateTranslationForm
            translation={translation}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <Link
              href={`/phrases/${translation.phrase}?tab=translations#${translation.id}`}
            >
              <p className="mb-1 text-wrap whitespace-pre-line text-lg hover:text-primary">
                {translation.content}
              </p>
            </Link>

            <div className="flex flex-wrap gap-1 items-center">
              {(translation.source_title || translation.source_link) && (
                <Source
                  source_title={translation.source_title}
                  source_link={translation.source_link}
                />
              )}
            </div>
          </>
        )}
      </CardContent>

      <CardFooter>
        <EntryFooter entry={translation} />
      </CardFooter>
    </Card>
  );
}
