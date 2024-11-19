import React from 'react';
import Link from 'next/link';
import { TextEntry, Translation } from '@/types';
import getVotes from '@/lib/vote/getVotes';
import VoteActions from '../components/VoteActions';
import { BiMessageSquareDetail } from 'react-icons/bi';

interface Props {
  entry: TextEntry | Translation;
  type: 'text-entries' | 'translations';
  className?: string;
}

export default async function PostFooter({
  entry,
  type,
  className = '',
}: Props) {
  const votes = await getVotes(entry.id, type);

  return (
    <div className={`${className} flex gap-2 items-center text-sm`}>
      <VoteActions entry={entry} type={type} votes={votes} />
      {type === 'text-entries' && (
        <Link
          href={`/posts/${entry.id}?tab=translations`}
          className="btn btn-sm flex"
        >
          <BiMessageSquareDetail />
          <span>{(entry as TextEntry)?.translation_count || 0}</span>
        </Link>
      )}
    </div>
  );
}
