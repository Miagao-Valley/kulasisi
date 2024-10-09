import React, { Suspense } from 'react';
import UsersList from './UsersList';
import UsersListSkeleton from './UsersListSkeleton';

export default async function UsersPage() {
  return (
    <>
      <h1>Users</h1>
      <Suspense fallback={<UsersListSkeleton />}>
        <UsersList />
      </Suspense>
    </>
  );
}
