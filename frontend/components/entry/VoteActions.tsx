'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import { Entry, Vote } from '@/types/core';
import vote from '@/lib/vote/vote';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';

interface Props {
  entry: Entry;
}

export default function VoteActions({ entry }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [voteCount, setVoteCount] = useState(entry.vote_count);
  const [currentVote, setCurrentVote] = useState<Vote['value']>(
    entry.user_vote
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVoteCount(entry.vote_count);
  }, []);

  const handleVote = async (value: Vote['value']) => {
    setIsLoading(true);

    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to vote.');
      router.push(`/login?next=${pathname}`);
      setIsLoading(false);
      return;
    }

    if (auth.user?.username === entry.contributor) {
      toast.error('You cannot vote your entries.');
      setIsLoading(false);
      return;
    }

    const previousVote = currentVote;
    // Calculate the intended new vote.
    const newVote = previousVote === value ? 0 : value;
    // Change in vote.
    const delta = newVote - previousVote;

    // Optimistically update state using functional updates.
    setVoteCount((prev) => prev + delta);
    setCurrentVote(newVote);

    try {
      const res = await vote(entry, newVote);
      if (res?.error) {
        // Revert state changes on error.
        console.error(res?.error);
        setVoteCount((prev) => prev - delta);
        setCurrentVote(previousVote);
        toast.error('Failed to vote.');
      }
    } catch (error) {
      console.error(error);
      setVoteCount((prev) => prev - delta);
      setCurrentVote(previousVote);
      toast.error('Failed to vote.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-0 flex items-center rounded-md border">
      <Button
        variant="ghost"
        className="p-1 w-fit h-fit"
        type="button"
        disabled={isLoading}
        onClick={() => handleVote(currentVote === 1 ? 0 : 1)}
      >
        <ArrowBigUp className={currentVote === 1 ? 'fill-current' : ''} />
      </Button>

      <span className="p-0 font-medium">{voteCount || 0}</span>

      <Button
        variant="ghost"
        className="p-1 w-fit h-fit"
        type="button"
        disabled={isLoading}
        onClick={() => handleVote(currentVote === -1 ? 0 : -1)}
      >
        <ArrowBigDown className={currentVote === -1 ? 'fill-current' : ''} />
      </Button>
    </div>
  );
}
