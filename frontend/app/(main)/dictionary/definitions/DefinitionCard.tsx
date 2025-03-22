'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Definition } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import EntryHeader from '@/components/entry/EntryHeader';
import EntryFooter from '@/components/entry/EntryFooter';
import Source from '@/components/cards/Source';
import UsageNote from '@/components/cards/UsageNote';
import { PosHoverCard } from '@/components/cards/PosCard';
import WordHoverCard from '@/components/cards/WordHoverCard';
import DefinitionDropdownMenu from './DefinitionDropdownMenu';
import UpdateDefinitionForm from './UpdateDefinitionForm';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { BookAIcon } from 'lucide-react';

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
        `flex flex-col gap-2 border-transparent ${
          clickable && 'hover:bg-accent/40'
        }`
      )}
    >
      <CardHeader className="flex flex-row items-center space-y-0 p-0 m-0">
        <div className="flex items-center gap-2 me-auto">
          <EntryHeader entry={definition} />
          <BookAIcon className="w-4 h-4 text-muted-foreground" />
        </div>
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
              <p className="mb-1 text-wrap text-xl font-bold hover:text-primary">
                {definition.description}
              </p>
            </Link>

            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap gap-1 items-center">
                {definition.usage_note && (
                  <UsageNote note={definition.usage_note} />
                )}

                {(definition.source_title || definition.source_link) && (
                  <Source
                    source_title={definition.source_title}
                    source_link={definition.source_link}
                  />
                )}

                {definition.pos && <PosHoverCard abbr={definition.pos} />}
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
