'use client';

import React from 'react';
import Link from 'next/link';
import { Phrase, Translation } from '@/types/phrases';
import { Word, Definition } from '@/types/dictionary';
import { Vote } from '@/types/core';
import { cn } from '@/lib/utils';
import VoteActions from './VoteActions';
import { Button } from '@/components/ui/button';
import { MessageCircleMore } from 'lucide-react';

interface Props {
  entry: Phrase | Translation | Word | Definition;
  votes: Vote[];
  type: string;
  className?: string;
}

export default function EntryFooter({
  entry,
  votes,
  type,
  className = '',
}: Props) {
  return (
    <div className={cn(className, 'flex flex-row gap-2 items-center text-sm')}>
      <VoteActions entry={entry} votes={votes} />

      {type === 'phrases' && (
        <Button variant="outline" asChild>
          <Link
            href={`/phrases/${entry.id}?tab=translations`}
            className="flex gap-[3px]"
          >
            <MessageCircleMore />
            <span>{(entry as Phrase)?.translation_count || 0}</span>
          </Link>
        </Button>
      )}
      {type === 'words' && (
        <Button variant="outline" className="p-1" asChild>
          <Link
            href={`/dictionary/${entry.id}?tab=definitions`}
            className="flex gap-[3px]"
          >
            <MessageCircleMore />
            <span>0</span>
          </Link>
        </Button>
      )}
    </div>
  );
}
