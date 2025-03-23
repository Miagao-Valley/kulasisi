'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { WordleGameStats } from '@/types/games';
import { getWordleGameStats } from '@/lib/games/wordle';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ChartColumnBigIcon } from 'lucide-react';

interface GameStatsProps {
  className?: string;
}

export function GameStats({ className = '' }: GameStatsProps) {
  const auth = useAuth();
  const [gameStats, setGameStats] = useState<WordleGameStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGameStats = async () => {
      setLoading(true);
      const { data, error } = await getWordleGameStats();
      if (error) {
        setGameStats(null);
        return;
      }
      setGameStats(data || null);
      setLoading(false);
    };

    if (auth.isAuthenticated) {
      fetchGameStats();
    }
  }, [auth.isAuthenticated]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(className)}>
          <ChartColumnBigIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Stats</DialogTitle>
        </DialogHeader>
        {!auth.isAuthenticated ? (
          <div className="text-center">Please sign in to view your stats.</div>
        ) : loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : gameStats === null ? (
          <div className="text-center">No game stats found.</div>
        ) : (
          <div className="flex flex-col gap-2">
            <div>{gameStats.games_won} games won</div>
            <div>{gameStats.games_lost} games lost</div>
            <div>{(gameStats.win_rate * 100).toFixed(2)}% win rate</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
