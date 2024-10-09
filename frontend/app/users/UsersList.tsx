import React from 'react';
import Link from 'next/link';
import getUsers from '@/lib/users/getUsers';

interface Props {
  className?: string;
}

export default async function UsersList({ className = '' }: Props) {
  const users = await getUsers();

  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
    >
      {users.map((user) => {
        return (
          <li key={user.id}>
            <Link
              className="hover:text-primary flex flex-col"
              href={`/users/${user.username}`}
            >
              <div className="font-semibold">@{user.username}</div>
              <div className="text-xs">{user.email || 'No email'}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
