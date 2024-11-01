import Link from 'next/link';
import { PaginationDetails, User } from '@/types';

interface Props {
  users?: PaginationDetails & { results: User[] };
  className?: string;
}

export default function UsersList({ users, className = '' }: Props) {
  return (
    <ul
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
    >
      {users?.results?.map((user) => (
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
