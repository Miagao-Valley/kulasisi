'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import { Entry, Vote } from '@/types/core';
import vote from '@/lib/vote/vote';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';

interface Props {
  entry: Entry;
  votes: Vote[];
}

export default function VoteActions({ entry, votes }: Props) {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(false);

  const [currentVote, setCurrentVote] = useState<Vote | undefined>(
    votes.find((vote) => vote.user === auth.username),
  );

  const handleVote = async (value: -1 | 0 | 1) => {
    setIsLoading(true);

    if (!auth.isAuthenticated) {
      toast.error('You need to sign in to vote.');
      router.push(`/login?next=${pathname}`);
      setIsLoading(false);
      return;
    }

    if (auth.username === entry.contributor) {
      toast.error('You cannot vote your entries.');
      setIsLoading(false);
      return;
    }

    const previousVote = currentVote;
    const now = new Date();

    setCurrentVote({
      user: auth.username,
      value: value,
      voted_at: now,
    });

    try {
      const res = await vote(entry, value);
      if (
        (res && typeof res === 'object' && Object.keys(res).length === 0) ||
        res?.error
      ) {
        setCurrentVote(previousVote);
        toast.error('Failed to vote.');
      }
    } catch (error) {
      console.error(error);
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
        size="icon"
        className="p-0 text-lg"
        type="button"
        disabled={isLoading}
        onClick={() => handleVote(currentVote?.value === 1 ? 0 : 1)}
      >
        <ArrowBigUp
          className={currentVote?.value === 1 ? 'fill-current' : ''}
        />
      </Button>

      <span className="p-0 font-medium">{entry?.vote_count || 0}</span>

      <Button
        variant="ghost"
        size="icon"
        className="p-0 text-lg"
        type="button"
        disabled={isLoading}
        onClick={() => handleVote(currentVote?.value === -1 ? 0 : -1)}
      >
        <ArrowBigDown
          className={currentVote?.value === -1 ? 'fill-current' : ''}
        />
      </Button>
    </div>
  );
}
