'use client';

import React, { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import toast from 'react-hot-toast';
import { TextEntry, Translation, Vote } from '@/types';
import vote from '@/lib/vote/vote';
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from 'react-icons/bi';

interface Props {
  entry: TextEntry | Translation;
  type: 'text-entries' | 'translations';
  votes: Vote[];
}

export default function VoteActions({ entry, type, votes }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [currentVote, setCurrentVote] = useState<Vote | undefined>();

  useEffect(() => {
    setCurrentVote(votes.find((vote) => vote.user === auth.username));
  }, [votes, auth.username]);

  const handleSubmit = async (prevState: any, formData: FormData) => {
    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to vote.');
      router.push(`/auth/login?next=${pathname}`);
      return;
    }

    if (auth.username === entry.contributor) {
      toast.error('You cannot vote your posts.');
      return;
    }

    const value = Number(formData.get('value')) as -1 | 0 | 1;
    const res = await vote(entry.id, type, value);
    return res;
  };

  const formAction = useFormState(handleSubmit, null)[1];

  return (
    <div className="bg-base-200 rounded-full p-1 flex items-center">
      <form action={formAction}>
        <input
          type="hidden"
          name="value"
          value={currentVote?.value === 1 ? 0 : 1}
        />
        <UpvoteButton currentVote={currentVote} />
      </form>
      <span className="font-medium">{entry?.vote_count || 0}</span>
      <form action={formAction}>
        <input
          type="hidden"
          name="value"
          value={currentVote?.value === -1 ? 0 : -1}
        />
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
    <button
      className="btn btn-ghost btn-xs btn-circle text-lg"
      type="submit"
      disabled={pending}
    >
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
    <button
      className="btn btn-ghost btn-xs btn-circle text-lg"
      type="submit"
      disabled={pending}
    >
      {currentVote?.value === -1 ? <BiSolidDownvote /> : <BiDownvote />}
    </button>
  );
}
