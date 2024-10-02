import React from 'react';
import { Lang } from '@/types';
import getLangs from '@/lib/langs/getLangs';
import LangsList from './LangsList';

export default async function LangsPage() {
  const langs: Lang[] = await getLangs();

  return (
    <>
      <h1>Languages</h1>
      <LangsList langs={langs} />
    </>
  );
}
