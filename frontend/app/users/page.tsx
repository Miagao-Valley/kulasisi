import React from 'react';
import getUsers from '@/lib/users/getUsers';
import UsersList from './UsersList';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <h1>Users</h1>
      <UsersList users={users} />
    </>
  );
}
