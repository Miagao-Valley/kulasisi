'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PartOfSpeech } from '@/types/dictionary';
import getPartOfSpeech from '@/lib/definitions/getPartOfSpeech';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  abbr: string;
}

export default function PosHoverCard({ abbr }: Props) {
  const [pos, setPos] = useState<PartOfSpeech | null>(null);
  const [loading, setLoading] = useState(true);

  const handleHover = async (open: boolean) => {
    if (open && !pos) {
      setLoading(true);
      const res = await getPartOfSpeech(abbr);
      setPos(res);
      setLoading(false);
    }
  };

  return (
    <HoverCard onOpenChange={handleHover}>
      <HoverCardTrigger asChild>
        <Link
          href={`/dictionary?pos=${abbr}`}
          className="flex gap-2 items-center"
        >
          <Badge variant="secondary" className="truncate flex justify-center">
            {abbr}
          </Badge>
        </Link>
      </HoverCardTrigger>

      <HoverCardContent className="max-w-80">
        <div className="flex flex-col gap-1">
          {loading ? (
            <Skeleton className="w-24 h-4" />
          ) : (
            <h2 className="text-secondary-foreground font-semibold truncate">
              {pos?.name}
            </h2>
          )}

          {loading ? (
            <div className="flex flex-col gap-1">
              <Skeleton className="w-32 h-2" />
              <Skeleton className="w-28 h-2" />
            </div>
          ) : (
            <p className="text-xs w-full">{pos?.description}</p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
