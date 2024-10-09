import React, { Suspense } from 'react';
import LangsList from './LangsList';
import LangsListSkeleton from './LangsListSkeleton';

export default async function LangsPage() {
  return (
    <>
      <h1>Languages</h1>
      <Suspense fallback={<LangsListSkeleton />}>
        <LangsList />
      </Suspense>
    </>
  );
}
