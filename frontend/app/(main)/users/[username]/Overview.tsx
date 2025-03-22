'use client';

import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import { User } from '@/types/users';
import { cn } from '@/lib/utils';
import { badgeVariants } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { H1 } from '@/components/ui/heading-with-anchor';
import { Button } from '@/components/ui/button';
import {
  CakeSliceIcon,
  CalendarFoldIcon,
  LinkIcon,
  MapPinIcon,
  Pen,
} from 'lucide-react';

interface Props {
  user: User;
  className?: string;
}

export default function Overview({ user, className = '' }: Props) {
  const auth = useAuth();

  return (
    <div className={cn(className, '')}>
      <div className="flex gap-1">
        <div className="flex gap-3">
          <Avatar className="h-16 w-16 rounded-lg">
            <AvatarImage src={''} alt={user?.username} />
            <AvatarFallback>
              {user?.username.slice(0, 1).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <H1 className="!text-2xl truncate m-0">
              {user.first_name} {user.last_name}
            </H1>
            <span>@{user.username}</span>
          </div>
        </div>
        {auth.isAuthenticated && auth.user?.username === user.username && (
          <Button variant="outline" className="ms-auto" asChild>
            <Link href={`/settings/?tab=profile`}>
              <Pen />
              <span className="hidden md:flex">Edit Profile</span>
            </Link>
          </Button>
        )}
      </div>

      <p className="mt-3 mb-2">{user.bio}</p>
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-3 text-sm mb-2">
        {user.location && (
          <span className="flex items-center gap-0">
            <MapPinIcon className="w-4" />
            {user.location}
          </span>
        )}
        {user.date_of_birth && (
          <span className="flex items-center gap-1">
            <CalendarFoldIcon className="w-4" />
            Born{' '}
            {user.date_of_birth.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        )}
        {user.date_joined && (
          <span className="flex items-center gap-1">
            <CakeSliceIcon className="w-4" />
            Joined{' '}
            {user.date_joined.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        )}
      </div>
      <div className="flex gap-3 text-sm mb-2">
        {user.website && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={user.website}
            className={badgeVariants({ variant: 'outline' })}
          >
            <LinkIcon className="w-3 me-1" />
            {new URL(user.website).hostname.replace(/^www\./, '')}
          </a>
        )}
      </div>
    </div>
  );
}
