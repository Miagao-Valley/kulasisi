'use client';

import React from 'react';
import { Phrase, Translation } from '@/types/phrases';
import { Word, Definition } from '@/types/dictionary';
import { Vote } from '@/types/core';
import { cn } from '@/lib/utils';
import VoteActions from './VoteActions';

interface Props {
  entry: Phrase | Translation | Word | Definition;
  votes: Vote[];
  className?: string;
}

export default function EntryFooter({ entry, votes, className = '' }: Props) {
  return (
    <div className={cn(className, 'flex flex-row gap-2 items-center text-sm')}>
      <VoteActions entry={entry} votes={votes} />
    </div>
  );
}
