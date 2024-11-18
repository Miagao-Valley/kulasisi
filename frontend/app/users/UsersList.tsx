import Link from 'next/link';
import getUsers from '@/lib/users/getUsers';
import Pagination from '../components/Pagination';

interface Props {
  searchTerm: string,
  sortOption: string,
  isDescending: boolean,
  page: number,
  className?: string;
}

export default async function UsersList({ searchTerm,
  sortOption,
  isDescending,
  page,
  className = '',
}: Props) {
  const limit = 10;
  const users = await getUsers({
    search: searchTerm,
    ordering: isDescending ? `-${sortOption}` : sortOption,
    limit: limit,
    offset: limit * (page - 1),
  });

  return (
    <>
      <ul
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
      >
        {users && users.results && users.results.length > 0 ? (
          users.results.map((user) => (
            <li key={user.id}>
              <Link
                className="hover:text-primary flex flex-col"
                href={`/users/${user.username}`}
              >
                <div className="font-semibold">@{user.username}</div>
                <div className="text-xs">{user.email || 'No email'}</div>
              </Link>
            </li>
          ))
        ) : (
          <li className="w-full col-span-full p-3 text-center">
            <div>No users found</div>
          </li>
        )}
      </ul>
      <Pagination
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
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ${className}`}
    >
      {Array.from({ length: 40 }, (_, i) => (
        <li key={i} className="skeleton w-full h-10"></li>
      ))}
    </ul>
  );
}
