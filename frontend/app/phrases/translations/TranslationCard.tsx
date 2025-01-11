'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Vote } from '@/types/core';
import { Translation, TranslationRevision } from '@/types/phrases';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/EntryHeader';
import EntryFooter from '@/components/EntryFooter';
import TranslationDropdownMenu from './TranslationDropdownMenu';
import UpdateTranslationForm from './UpdateTranslationForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { badgeVariants } from '@/components/ui/badge';
import { LinkIcon } from 'lucide-react';

interface Props {
  translation: Translation;
  votes: Vote[];
  revisions: TranslationRevision[];
  className?: string;
}

export default function TranslationCard({
  translation,
  votes,
  revisions,
  className = '',
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card className={cn(className, '')}>
      <CardHeader className="flex flex-row">
        <EntryHeader className="me-auto" entry={translation} />
        <TranslationDropdownMenu
          translation={translation}
          revisions={revisions}
          setIsEditing={setIsEditing}
        />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UpdateTranslationForm
            translation={translation}
            initialContent={translation.content}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <Link
              href={`/phrases/${translation.phrase}?tab=translations#${translation.id}`}
            >
              <p className="mb-2 whitespace-pre-line">{translation.content}</p>
            </Link>
            <div className="flex gap-2">
              {(translation.source_title || translation.source_link) &&
                <a target="_blank" rel="noopener noreferrer" href={translation.source_link} className={badgeVariants({ variant: "outline" })}>
                  <LinkIcon className="w-3 me-1" />
                  {translation.source_title || translation.source_link}
                </a>
              }
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={translation} votes={votes} />
      </CardFooter>
    </Card>
  );
}
