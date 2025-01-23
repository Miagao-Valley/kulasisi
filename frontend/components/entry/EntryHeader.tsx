'use client';

import React from 'react';
import naturalTime from '@/utils/naturalTime';
import { Phrase, Translation } from '@/types/phrases';
import { Word, Definition } from '@/types/dictionary';
import { cn } from '@/lib/utils';
import LangHoverCard from '../hover-cards/LangHoverCard';
import UserHoverCard from '../hover-cards/UserHoverCard';

interface Props {
  entry: Phrase | Translation | Word | Definition;
  className?: string;
}

export default function EntryHeader({ entry, className = '' }: Props) {
  return (
    <div className={cn(className, 'flex flex-row gap-1 items-center text-sm')}>
      <LangHoverCard code={entry.lang} />
      •
      <UserHoverCard username={entry.contributor} />•
      <span className="text-sm text-muted-foreground truncate">
        {naturalTime(entry.updated_at)}
      </span>
    </div>
  );
}
