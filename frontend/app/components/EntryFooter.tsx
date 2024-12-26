import React from 'react';
import Link from 'next/link';
import { Phrase, Translation, DictEntry, Definition } from '@/types';
import getVotes from '@/lib/vote/getVotes';
import VoteActions from './VoteActions';
import { BiMessageSquareDetail } from 'react-icons/bi';

interface Props {
  entry: Phrase | Translation | DictEntry | Definition;
  type: 'phrases' | 'translations' | 'dict-entries' | 'definitions';
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
      {type === 'phrases' && (
        <Link
          href={`/phrases/${entry.id}?tab=translations`}
          className="btn btn-sm flex"
        >
          <BiMessageSquareDetail />
          <span>{(entry as Phrase)?.translation_count || 0}</span>
        </Link>
      )}
      {type === 'dict-entries' && (
        <Link
          href={`/dictionary/${entry.id}?tab=definitions`}
          className="btn btn-sm flex"
        >
          <BiMessageSquareDetail />
          <span>0</span>
        </Link>
      )}
    </div>
  );
}
