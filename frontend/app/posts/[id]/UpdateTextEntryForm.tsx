'use client';

import React, { useRef } from 'react';
import updateTextEntry from '@/lib/textEntries/updateTextEntry';
import deleteTextEntry from '@/lib/textEntries/deleteTextEntry';

interface Props {
  id: number;
  initialContent?: string;
}

export default function UpdateTextEntryForm({
  id,
  initialContent = '',
}: Props) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <>
      <form
        ref={ref}
        action={async (data: FormData) => {
          await updateTextEntry(id, data);
        }}
      >
        <textarea name="content" id="content-field" cols={15} rows={5}>
          {initialContent}
        </textarea>
        <div>
          <button
            formAction={async () => {
              await deleteTextEntry(id);
            }}
          >
            Delete
          </button>
          <button type="submit">Update</button>
        </div>
      </form>
    </>
  );
}
