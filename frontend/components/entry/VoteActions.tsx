'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import { Entry, VoteValue } from '@/types/core';
import { vote } from '@/lib/vote/vote';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';

interface Props {
  entry: Entry;
}

export function VoteActions({ entry }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [voteCount, setVoteCount] = useState(entry.vote_count);
  const [currentVote, setCurrentVote] = useState<VoteValue>(entry.user_vote);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVoteCount(entry.vote_count);
  }, []);

  const handleVote = async (value: VoteValue) => {
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
    const newVote = previousVote === value ? VoteValue.Unvote : value;
    // Change in vote.
    const delta = newVote - previousVote;

    // Optimistically update state using functional updates.
    setVoteCount((prev) => prev + delta);
    setCurrentVote(newVote);

    const { error } = await vote(entry, newVote);
    if (error) {
      // Revert state changes on error.
      console.error(error);
      setVoteCount((prev) => prev - delta);
      setCurrentVote(previousVote);
      toast.error('Failed to vote.');
    }

    setIsLoading(false);
  };

  return (
    <div className="p-0 flex items-center rounded-md border">
      <Button
        variant="ghost"
        size="icon"
        className="p-1 w-fit h-fit"
        type="button"
        disabled={isLoading}
        onClick={() =>
          handleVote(
            currentVote === VoteValue.Upvote
              ? VoteValue.Unvote
              : VoteValue.Upvote
          )
        }
      >
        <ArrowBigUp
          className={currentVote === VoteValue.Upvote ? 'fill-current' : ''}
        />
      </Button>

      <span className="p-0 font-medium">{voteCount || VoteValue.Unvote}</span>

      <Button
        variant="ghost"
        size="icon"
        className="p-1 w-fit h-fit"
        type="button"
        disabled={isLoading}
        onClick={() =>
          handleVote(
            currentVote === VoteValue.Downvote
              ? VoteValue.Unvote
              : VoteValue.Downvote
          )
        }
      >
        <ArrowBigDown
          className={currentVote === VoteValue.Downvote ? 'fill-current' : ''}
        />
      </Button>
    </div>
  );
}
