'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { User } from '@/types/users';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { H1 } from '@/components/ui/heading-with-anchor';
import { Pen } from 'lucide-react';

interface Props {
  user: User;
  className?: string;
}

export default function Overview({ user, className = '' }: Props) {
  const auth = useAuth();

  return (
    <div className={cn(className, '')}>
      <div className="flex gap-1">
        <div>
          <H1 className="!text-2xl m-0">
            {user.first_name} {user.last_name}
          </H1>
          <span>@{user.username}</span>
        </div>
        {auth.isAuthenticated && auth.username === user.username && (
          <Button variant="outline" className="ms-auto" asChild>
            <Link href={`/settings/?tab=profile`}>
              <Pen /> Edit Profile
            </Link>
          </Button>
        )}
      </div>

      <p className="mt-3 mb-2">{user.bio}</p>
      <div className="flex gap-3 text-sm mb-2">
        {user.website && (
          <span className="flex items-center gap-1">
            <Link className="link link-primary link-hover" href={user.website}>
              {new URL(user.website).hostname.replace(/^www\./, '')}
            </Link>
          </span>
        )}
        {user.location && (
          <span className="flex items-center gap-1">{user.location}</span>
        )}
        {user.date_of_birth && (
          <span className="flex items-center gap-1">
            Born{' '}
            {user.date_of_birth.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        )}
        {user.date_joined && (
          <span className="flex items-center gap-1">
            Joined{' '}
            {user.date_joined.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        )}
      </div>
    </div>
  );
}
