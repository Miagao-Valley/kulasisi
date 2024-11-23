import Link from 'next/link';
import getUsers from '@/lib/users/getUsers';
import Pagination from '../components/Pagination';
import Username from '../components/Username';

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
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 ${className}`}
      >
        {users && users.results && users.results.length > 0 ? (
          users.results.map((user) => (
            <li key={user.id}>
              <Link
                className="btn btn-ghost w-full flex flex-col gap-1 items-start"
                href={`/users/${user.username}/`}
              >
                <Username
                  username={user.username}
                  reputation={user.reputation}
                />
                <div className="text-xs">{`${user.first_name} ${user.last_name}`}</div>
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
