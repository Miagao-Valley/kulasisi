import React, { Suspense } from 'react';
import AddTextEntryForm from './AddTextEntryForm';
import TextEntriesList from './TextEntriesList';
import TextEntriesListSkeleton from './TextEntriesListSkeleton';

export default async function PostsPage() {
  return (
    <>
      <h1>Posts</h1>
      <AddTextEntryForm className="mb-4" />
      <Suspense fallback={<TextEntriesListSkeleton />}>
        <TextEntriesList />
      </Suspense>
    </>
  );
}
