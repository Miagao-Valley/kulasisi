'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { User } from '@/types/users';
import { getUser } from '@/lib/users/getUser';
import { shortenNum } from '@/lib/utils/shortenNum';
import { LangHoverCard } from './LangCard';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '../ui/card';

interface UserCardProps {
  user: User;
  clickable?: boolean;
  className?: string;
}

export function UserCard({
  user,
  clickable = true,
  className = '',
}: UserCardProps) {
  return (
    <Card className={cn(className, clickable && 'hover:bg-accent/40')}>
      <div className="flex gap-2">
        <Avatar>
          <>
            <AvatarImage src="" alt={user.username} />
            <AvatarFallback>
              {user.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </>
        </Avatar>
        <div className="flex flex-col gap-0">
          <Link
            href={`/users/${user.username}/`}
            className="w-full font-semibold truncate max-w-48 hover:text-primary"
          >{`${user?.first_name || ''} ${user?.last_name || ''}`}</Link>
          <div className="text-sm text-muted-foreground">@{user.username}</div>
          <div className="flex gap-1 text-sm font-semibold">
            {shortenNum(user?.reputation || 0)}{' '}
            <span className="text-muted-foreground">Reputation</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 items-center mt-2">
        {user.language_proficiencies?.map((lang) => (
          <LangHoverCard code={lang.lang} key={lang.lang} />
        ))}
      </div>
    </Card>
  );
}

interface UserHoverCardProps {
  username: string;
}

export function UserHoverCard({ username }: UserHoverCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleHover = async (open: boolean) => {
    if (open && !user) {
      setLoading(true);
      const data = await getUser(username);
      setUser(data);
      setLoading(false);
    }
  };

  return (
    <HoverCard onOpenChange={handleHover}>
      <HoverCardTrigger asChild>
        <Link href={`/users/${username}/`} className="flex gap-2 items-center">
          @{username}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="max-w-80 p-0">
        {loading || !user ? (
          <div className="flex gap-2 p-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-20 h-4" />
              <Skeleton className="w-24 h-2" />
            </div>
          </div>
        ) : (
          <UserCard
            user={user}
            clickable={false}
            className="border-transparent"
          />
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
