import React from 'react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import getPartOfSpeech from '@/lib/definitions/getPartOfSpeech';
import Link from 'next/link';

interface Props {
  abbr: string;
  className?: string;
}

export default async function PosCard({
  abbr,
  className = '',
}: Props) {
  const pos = await getPartOfSpeech(abbr);

  return (
    <Card
      className={cn(
        className,
        `shadow-none'}`,
      )}
    >
      <CardContent>
        <div className="flex gap-2">
          <Link href={`/dictionary?pos=${pos.name}`}>
            <h2 className="text-xl text-secondary-foreground">{pos.name}</h2>
          </Link>
        </div>
        <p className="text-sm mb-1 whitespace-pre-line">{pos.description}</p>
      </CardContent>
    </Card>
  );
}
