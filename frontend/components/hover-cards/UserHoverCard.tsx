'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User } from '@/types/users';
import getUser from '@/lib/users/getUser';
import shortenNum from '@/utils/shortenNum';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  username: string;
  showAvatar?: boolean;
}

export default function UserHoverCard({ username, showAvatar = false }: Props) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await getUser(username);
      setUser(res);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/users/${username}/`} className="flex gap-2 items-center">
          {showAvatar && (
            <Avatar>
              {loading ? (
                <Skeleton className="w-12 h-12 rounded-full" />
              ) : (
                <>
                  <AvatarImage src="" alt={username} />
                  <AvatarFallback>
                    {username.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </>
              )}
            </Avatar>
          )}
          <span>@{username}</span>
        </Link>
      </HoverCardTrigger>

      <HoverCardContent className="max-w-80">
        <div className="flex gap-2">
          <Avatar>
            {loading ? (
              <Skeleton className="w-12 h-12 rounded-full" />
            ) : (
              <>
                <AvatarImage src="" alt={username} />
                <AvatarFallback>
                  {username.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </>
            )}
          </Avatar>
          <div className="flex flex-col gap-1">
            {loading ? (
              <Skeleton className="w-32 h-4" />
            ) : (
              <h2 className="font-semibold truncate max-w-40">{`${user?.first_name || ''} ${user?.last_name || ''}`}</h2>
            )}
            {loading ? (
              <Skeleton className="w-20 h-4" />
            ) : (
              <span className="text-sm">
                {shortenNum(user?.reputation || 0)} Reputation
              </span>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
