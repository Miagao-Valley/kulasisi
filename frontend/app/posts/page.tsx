import React from 'react';
import getTextEntries from '@/lib/textEntries/getTextEntries';
import getLangs from '@/lib/langs/getLangs';
import TextEntriesList from './TextEntriesList';
import AddTextEntryForm from './AddTextEntryForm';

export default async function PostsPage() {
  const textEntries = await getTextEntries();
  const langs = await getLangs();

  return (
    <>
      <h1>Posts</h1>
      <AddTextEntryForm langs={langs} />
      <TextEntriesList textEntries={textEntries} />
    </>
  );
}
