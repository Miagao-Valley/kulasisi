'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Definition } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/entry/EntryHeader';
import EntryFooter from '@/components/entry/EntryFooter';
import Source from '@/components/hover-cards/Source';
import UsageNote from '@/components/hover-cards/UsageNote';
import PosHoverCard from '@/components/hover-cards/PosHoverCard';
import WordHoverCard from '@/components/hover-cards/WordHoverCard';
import DefinitionDropdownMenu from './DefinitionDropdownMenu';
import UpdateDefinitionForm from './UpdateDefinitionForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

interface Props {
  definition: Definition;
  clickable?: boolean;
  className?: string;
}

export default function DefinitionCard({
  definition,
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
        <EntryHeader className="me-auto" entry={definition} />
        <DefinitionDropdownMenu
          definition={definition}
          setIsEditing={setIsEditing}
        />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <UpdateDefinitionForm
            definition={definition}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <Link
              href={`/dictionary/${definition.word.lang}/${definition.word.word}?tab=definitions#${definition.id}`}
            >
              <p className="mb-2 whitespace-pre-line">
                {definition.description}
              </p>
            </Link>
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap gap-0 items-center">
                {definition.pos && <PosHoverCard abbr={definition.pos} />}
                {(definition.source_title || definition.source_link) && (
                  <Source
                    source_title={definition.source_title}
                    source_link={definition.source_link}
                  />
                )}
                {definition.usage_note && (
                  <UsageNote note={definition.usage_note} />
                )}
              </div>
              {definition.synonyms && definition.synonyms.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center me-1">
                  <span className="text-sm text-muted-foreground">
                    Synonyms:{' '}
                  </span>
                  {definition.synonyms.map((synonym) => (
                    <WordHoverCard
                      lang={definition.lang}
                      word={synonym}
                      key={`${synonym} (${definition.lang})`}
                    />
                  ))}
                </div>
              )}
              {definition.antonyms && definition.antonyms.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center me-1">
                  <span className="text-sm text-muted-foreground">
                    Antonyms:{' '}
                  </span>
                  {definition.antonyms.map((antonym) => (
                    <WordHoverCard
                      lang={definition.lang}
                      word={antonym}
                      key={`${antonym} (${definition.lang})`}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        <EntryFooter entry={definition} />
      </CardFooter>
    </Card>
  );
}
