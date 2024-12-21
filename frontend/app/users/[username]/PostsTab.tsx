import React from 'react';
import { User } from '@/types';
import TextEntriesList from '@/app/posts/TextEntriesList';

interface Props {
  user: User;
}

export default async function PostsTab({ user }: Props) {
  const filters = { contributor: user.username };
  return (
    <>
      <TextEntriesList filters={filters} />
    </>
  );
}
