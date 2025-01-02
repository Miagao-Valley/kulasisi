'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { Entry, Vote } from '@/types/core';
import vote from '@/lib/vote/vote';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from 'react-icons/bi';

interface Props {
  entry: Entry;
  votes: Vote[];
}

export default function VoteActions({ entry, votes }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  const [currentVote, setCurrentVote] = useState<Vote | undefined>();

  useEffect(() => {
    setCurrentVote(votes.find((vote) => vote.user === auth.username));
  }, [votes, auth.username]);

  const handleVote = async (value: -1 | 0 | 1) => {
    setIsLoading(true);

    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to vote.');
      router.push(`/auth/login?next=${pathname}`);
      setIsLoading(false);
      return;
    }

    if (auth.username === entry.contributor) {
      toast.error('You cannot vote your entries.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await vote(entry, value);
      if (res?.error) {
        toast.error('Failed to vote.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to vote.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-0 flex items-center rounded-md border border-input bg-background shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        className="p-0 text-lg"
        type="submit"
        disabled={isLoading}
        onClick={() => handleVote(currentVote?.value === 1 ? 0 : 1)}
      >
        {currentVote?.value === 1 ? <BiSolidUpvote /> : <BiUpvote />}
      </Button>

      <span className="p-0 font-medium">{entry?.vote_count || 0}</span>

      <Button
        variant="ghost"
        size="icon"
        className="p-0 text-lg"
        type="submit"
        disabled={isLoading}
        onClick={() => handleVote(currentVote?.value === -1 ? 0 : -1)}
      >
        {currentVote?.value === -1 ? <BiSolidDownvote /> : <BiDownvote />}
      </Button>
    </div>
  );
}
