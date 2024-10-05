import React from 'react';
import Link from 'next/link';
import { User } from '@/types';
import { FaAt } from 'react-icons/fa';

interface Props {
  users: User[];
  className?: string;
}

export default function UsersList({ users, className = '' }: Props) {
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
