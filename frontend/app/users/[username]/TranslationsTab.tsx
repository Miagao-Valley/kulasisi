import React from 'react';
import { User } from '@/types';
import TranslationsList from '@/app/posts/[id]/translations/TranslationsList';

interface Props {
  user: User;
}

export default async function TranslationsTab({ user }: Props) {
  const filters = { author: user.username }
  return (
    <>
      <TranslationsList filters={filters} />
    </>
  );
}
