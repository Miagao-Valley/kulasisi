'use client'

import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import getVotes from '@/lib/vote/getVotes';
import { useAuth } from './AuthProvider';
import { TextEntry, Translation, Vote } from '@/types';
import vote from '@/lib/vote/vote';
import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from 'react-icons/bi';

interface Props {
  entry: TextEntry | Translation;
  type: "text-entries" | "translations"
}

export default function VoteActions({ entry, type }: Props) {
  const auth = useAuth();

  const [votes, setVotes] = useState<Vote[]>([]);
  const [currentVote, setCurrentVote] = useState<Vote | undefined>()

  useEffect(() => {
    const fetchVotes = async () => {
      const res = await getVotes(entry.id, type);
      setVotes(res);
    }

    fetchVotes();
  }, [entry.id, type])

  useEffect(() => {
    setCurrentVote(votes.find(vote => vote.user === auth.username));
  }, [votes, auth.username])

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const value = Number(formData.get("value")) as -1 | 0 | 1;
    const res = await vote(entry.id, type, value);
    return res;
  };

  const formAction = useFormState(handleSubmit, null)[1];

  return (
    <div className="flex">
      <form action={formAction}>
        <input type="hidden" name="value" value={1} />
        <UpvoteButton currentVote={currentVote} />
      </form>
      <span className='font-semibold'>{(entry?.upvotes || 0) - (entry?.downvotes || 0)}</span>
      <form action={formAction}>
        <input type="hidden" name="value" value={-1} />
        <DownvoteButton currentVote={currentVote} />
      </form>
    </div>
  );
}


interface UpvoteButtonProps {
  currentVote?: Vote;
}

export function UpvoteButton({ currentVote }: UpvoteButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-ghost btn-xs btn-circle text-primary text-lg" type="submit" disabled={pending}>
      {currentVote?.value === 1 ? <BiSolidUpvote /> : <BiUpvote />}
    </button>
  );
}

interface DownvoteButtonProps {
  currentVote?: Vote;
}

export function DownvoteButton({ currentVote }: DownvoteButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-ghost btn-xs btn-circle text-primary text-lg" type="submit" disabled={pending}>
      {currentVote?.value === -1 ? <BiSolidDownvote /> : <BiDownvote />}
    </button>
  );
}
