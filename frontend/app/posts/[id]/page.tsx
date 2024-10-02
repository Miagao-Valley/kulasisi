import React from 'react';
import { TextEntry } from '@/types';
import getTextEntry from '@/lib/textEntries/getTextEntry';
import TextEntryItem from './TextEntryItem';

interface Props {
  params: {
    id: string;
  };
}

export default async function PostPage({ params }: Props) {
  const id = Number(params.id);
  const textEntry: TextEntry = await getTextEntry(id);

  return (
    <>
      <TextEntryItem textEntry={textEntry} />
    </>
  );
}
