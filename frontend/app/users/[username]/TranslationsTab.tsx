import React from 'react';
import { User } from '@/types';
import TranslationsList from '@/app/phrases/[id]/translations/TranslationsList';

interface Props {
  user: User;
}

export default async function TranslationsTab({ user }: Props) {
  const filters = { contributor: user.username };
  return (
    <>
      <TranslationsList filters={filters} />
    </>
  );
}
