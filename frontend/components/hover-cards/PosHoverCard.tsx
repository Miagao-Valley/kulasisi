'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PartOfSpeech } from '@/types/dictionary';
import getPartOfSpeech from '@/lib/definitions/getPartOfSpeech';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

interface Props {
  abbr: string;
}

export default function PosHoverCard({ abbr }: Props) {
  const [pos, setPos] = useState<PartOfSpeech>();

  useEffect(() => {
    const fetchPos = async () => {
      const res = await getPartOfSpeech(abbr);
      setPos(res);
    };

    fetchPos();
  }, []);

  return (
    <HoverCard>
      {pos && (
        <>
          <HoverCardTrigger asChild>
            <Link
              href={`/dictionary?pos=${abbr}`}
              className="flex gap-2 items-center"
            >
              <Badge
                variant="secondary"
                className="truncate flex justify-center"
              >
                {pos.abbr}
              </Badge>
            </Link>
          </HoverCardTrigger>

          <HoverCardContent className="max-w-80">
            <div className="gap-1">
              <h2 className="text-secondary-foreground font-semibold truncate max-w-40">{pos.name}</h2>
              <p className="text-xs w-full max-w-40">{pos.description}</p>
            </div>
          </HoverCardContent>
        </>
      )}
    </HoverCard>
  );
}
