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

interface Props {
  username: string;
  showAvatar?: boolean;
}

export default function UserHoverCard({ username, showAvatar = false }: Props) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(username);
      setUser(res);
    };

    fetchUser();
  }, [username]);

  return (
    <HoverCard>
      {user && (
        <>
          <HoverCardTrigger asChild>
            <Link
              href={`/users/${username}/`}
              className="flex gap-2 items-center"
            >
              {showAvatar && (
                <Avatar>
                  <AvatarImage src="" alt={username} />
                  <AvatarFallback>
                    {username.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <span className="font-bold">@{username}</span>
            </Link>
          </HoverCardTrigger>

          <HoverCardContent className="w-80">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="" alt={username} />
                <AvatarFallback>
                  {username.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="gap-1">
                <h4 className="text-sm font-semibold">{`${user.first_name} ${user.last_name}`}</h4>
                <span>{shortenNum(user.reputation || 0)} Reputation</span>
              </div>
            </div>
          </HoverCardContent>
        </>
      )}
    </HoverCard>
  );
}
