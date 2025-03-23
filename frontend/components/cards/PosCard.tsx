'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PartOfSpeech } from '@/types/dictionary';
import { getPartOfSpeech } from '@/lib/definitions/getPartOfSpeech';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { Card } from '../ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface PosCardProps {
  pos: PartOfSpeech;
  clickable?: boolean;
  className?: string;
}

export function PosCard({
  pos,
  clickable = true,
  className = '',
}: PosCardProps) {
  return (
    <Card className={cn(className, clickable && 'hover:bg-accent/40')}>
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          <Badge variant="secondary" className="truncate flex justify-center">
            {pos.abbr}
          </Badge>
          <Link
            href={`/dictionary?pos=${pos.abbr}`}
            className="w-full font-semibold max-w-48 truncate hover:text-primary"
          >
            {pos.name}
          </Link>
        </div>
        <p className="text-xs w-full">{pos?.description}</p>
      </div>
    </Card>
  );
}

interface PosHoverCard {
  abbr: string;
}

export function PosHoverCard({ abbr }: PosHoverCard) {
  const [pos, setPos] = useState<PartOfSpeech | null>(null);
  const [loading, setLoading] = useState(true);

  const handleHover = async (open: boolean) => {
    if (open && !pos) {
      setLoading(true);
      const data = await getPartOfSpeech(abbr);
      setPos(data);
      setLoading(false);
    }
  };

  return (
    <HoverCard onOpenChange={handleHover}>
      <HoverCardTrigger asChild>
        <Link
          href={`/dictionary?pos=${abbr}`}
          className={cn(
            'truncate flex justify-center',
            badgeVariants({ variant: 'secondary' })
          )}
        >
          {abbr}
        </Link>
      </HoverCardTrigger>

      <HoverCardContent className="max-w-80 p-0">
        {loading || !pos ? (
          <div className="flex flex-col gap-1 p-3">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-36 h-2" />
            <Skeleton className="w-32 h-2" />
          </div>
        ) : (
          <PosCard pos={pos} clickable={false} className="border-transparent" />
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
