import React from 'react';
import { TextEntry } from '@/types';
import UpdateTextEntryForm from './UpdateTextEntryForm';

interface Props {
  textEntry: TextEntry;
}

export default async function TextEntryItem({ textEntry }: Props) {
  return (
    <>
      <p>
        {textEntry.content} ({textEntry.lang})
      </p>
      <UpdateTextEntryForm id={textEntry.id} />
    </>
  );
}
