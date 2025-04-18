import React from 'react';
import { Metadata } from 'next';
import { GameCard } from './GameCard';
import { H1 } from '@/components/ui/heading-with-anchor';
import { Grid2x2Icon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Games',
  description: 'Language games to play.',
};

const games = [
  {
    name: 'Wordle',
    description: 'Can you guess the hidden word?',
    icon: <Grid2x2Icon className="size-8" />,
    url: '/games/wordle/',
  },
];

export default function GamesPage() {
  return (
    <>
      <H1 className="text-center w-full">Games</H1>

      <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <li key={game.name}>
            <GameCard {...game} />
          </li>
        ))}
      </ul>
    </>
  );
}
