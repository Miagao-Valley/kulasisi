import React from 'react';
import { User } from '@/types';
import PhraseEntriesList from '@/app/phrases/PhraseEntriesList';

interface Props {
  user: User;
}

export default async function PhrasesTab({ user }: Props) {
  const filters = { contributor: user.username };
  return (
    <>
      <PhraseEntriesList filters={filters} />
    </>
  );
}
