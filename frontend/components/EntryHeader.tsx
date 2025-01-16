'use client';

import React, { Suspense } from 'react';
import naturalTime from '@/utils/naturalTime';
import { Phrase, Translation } from '@/types/phrases';
import { Word, Definition } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import LangHoverCard from './LangHoverCard';
import UserHoverCard from './UserHoverCard';
import { Skeleton } from './ui/skeleton';

interface Props {
  entry: Phrase | Translation | Word | Definition;
  className?: string;
}

export default function EntryHeader({ entry, className = '' }: Props) {
  return (
    <div className={cn(className, 'flex flex-row gap-1 items-center text-sm')}>
      <Suspense fallback={<Skeleton className="h-12 w-4 rounded-full" />}>
        <LangHoverCard code={entry.lang} />
      </Suspense>
      •
      <Suspense fallback={<Skeleton className="h-12 w-8 rounded-full" />}>
        <UserHoverCard username={entry.contributor} />
      </Suspense>
      •<span className="text-sm text-muted-foreground truncate">{naturalTime(entry.updated_at)}</span>
    </div>
  );
}
