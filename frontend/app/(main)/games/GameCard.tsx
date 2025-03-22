import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  name: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  className?: string;
}

export default function GameCard({
  name,
  description,
  icon,
  url,
  className = '',
}: Props) {
  return (
    <Card className={cn(className, `text-center`)}>
      <CardHeader className="p-0 flex flex-col justify-center items-center">
        {icon}
        <h2 className="text-xl font-bold hover:text-primary">
          <Link href={url}>{name}</Link>
        </h2>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={url}>Play</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
