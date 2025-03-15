import React from 'react';
import getUsers from '@/lib/users/getUsers';
import { cn } from '@/lib/utils';
import ListPagination from '@/components/pagination/ListPagination';
import UserCard from '@/components/cards/UserCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  searchTerm: string;
  sortOption: string;
  page: number;
  className?: string;
}

export default async function UsersList({
  searchTerm,
  sortOption,
  page,
  className = '',
}: Props) {
  const limit = 10;
  const users = await getUsers({
    search: searchTerm,
    ordering: sortOption,
    limit: limit,
    offset: limit * (page - 1),
  });

  return (
    <>
      <ul
        className={cn(
          className,
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
        )}
      >
        {users && users.results && users.results.length > 0 ? (
          users.results.map((user) => (
            <li key={user.id}>
              <UserCard user={user} className="w-full h-full" />
            </li>
          ))
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            No users found
          </li>
        )}
      </ul>
      <ListPagination
        className="my-5 flex justify-center"
        numPages={users?.num_pages || 1}
        currentPage={page}
        next={!!users?.next}
        prev={!!users?.previous}
      />
    </>
  );
}

interface SkeletonProps {
  className?: string;
}

export function UsersListSkeleton({ className = '' }: SkeletonProps) {
  return (
    <ul
      className={cn(
        className,
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'
      )}
    >
      {Array.from({ length: 20 }, (_, i) => (
        <Skeleton key={i} className="h-24 rounded-xl"></Skeleton>
      ))}
    </ul>
  );
}
