'use client';

import React, { useRef } from 'react';
import updateTextEntry from '@/lib/textEntries/updateTextEntry';
import deleteTextEntry from '@/lib/textEntries/deleteTextEntry';

interface Props {
  id: number;
  initialContent?: string;
  className?: string;
}

export default function UpdateTextEntryForm({
  id,
  initialContent = '',
  className = '',
}: Props) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      className={`flex flex-col gap-3 ${className}`}
      ref={ref}
      action={async (data: FormData) => {
        await updateTextEntry(id, data);
      }}
    >
      <textarea
        className="textarea textarea-bordered"
        name="content"
        id="content-field"
        cols={15}
        rows={5}
        placeholder="Enter updated text"
      >
        {initialContent}
      </textarea>
      <div className="flex justify-end gap-2">
        <button
          className="btn btn-error"
          formAction={async () => {
            await deleteTextEntry(id);
          }}
        >
          Delete
        </button>
        <button className="btn btn-primary" type="submit">
          Update
        </button>
      </div>
    </form>
  );
}
