import React from 'react';
import { User } from '@/types';
import getTextEntries from '@/lib/textEntries/getTextEntries';
import TextEntriesList from '@/app/posts/TextEntriesList';

interface Props {
  user: User;
}

export default async function PostsTab({ user }: Props) {
  const textEntries = await getTextEntries({ author__username: user.username });

  return (
    <>
      <TextEntriesList textEntries={textEntries} />
    </>
  );
}
