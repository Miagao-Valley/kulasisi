'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from '@/types';
import getUsers from '@/lib/users/getUsers';

interface Props {
  searchTerm: string;
  sortOption: string;
  isDescending: boolean;
  filters: object;
  className?: string;
}

export default function UsersList({
  searchTerm,
  sortOption,
  isDescending,
  filters,
  className = '',
}: Props) {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      const data = await getUsers({
        search: searchTerm,
        ordering: isDescending ? `-${sortOption}` : sortOption,
        is_staff: filters?.is_staff ? 'true' : '',
      });
      setUsers(data);
    };

    fetch();
    setLoading(false);
  }, [searchTerm, sortOption, isDescending, filters]);

  if (isLoading) {
    return <UsersListSkeleton />;
  }

  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
    >
      {users.map((user) => (
        <li key={user.id}>
          <Link
            className="hover:text-primary flex flex-col"
            href={`/users/${user.username}`}
          >
            <div className="font-semibold">@{user.username}</div>
            <div className="text-xs">{user.email || 'No email'}</div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

interface SkeletonProps {
  className?: string;
}

export function UsersListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
    >
      {Array.from({ length: 40 }, (_, i) => i).map((i) => {
        return <li key={i} className="skeleton w-full h-10"></li>;
      })}
    </ul>
  );
}
