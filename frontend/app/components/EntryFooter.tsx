import React from 'react';
import Link from 'next/link';
import { PhraseEntry, Translation } from '@/types';
import getVotes from '@/lib/vote/getVotes';
import VoteActions from './VoteActions';
import { BiMessageSquareDetail } from 'react-icons/bi';

interface Props {
  entry: PhraseEntry | Translation;
  type: 'phrase-entries' | 'translations';
  className?: string;
}

export default async function EntryFooter({
  entry,
  type,
  className = '',
}: Props) {
  const votes = await getVotes(entry.id, type);

  return (
    <div className={`${className} flex gap-2 items-center text-sm`}>
      <VoteActions entry={entry} type={type} votes={votes} />
      {type === 'phrase-entries' && (
        <Link
          href={`/phrases/${entry.id}?tab=translations`}
          className="btn btn-sm flex"
        >
          <BiMessageSquareDetail />
          <span>{(entry as PhraseEntry)?.translation_count || 0}</span>
        </Link>
      )}
    </div>
  );
}