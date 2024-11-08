import React from 'react';
import { User } from '@/types';
import getTranslations from '@/lib/translations/getTranslations';
import TranslationsList from '@/app/posts/[id]/translations/TranslationsList';

interface Props {
  user: User;
}

export default async function TranslationsTab({ user }: Props) {
  const translations = await getTranslations({
    author__username: user.username,
  });

  return (
    <>
      <TranslationsList translations={translations} />
    </>
  );
}
