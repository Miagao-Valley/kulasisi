'use client';

import React, { useRef } from 'react';
import updateTextEntry from '@/lib/textEntries/updateTextEntry';
import DeleteTextEntryModal from './DeleteTextEntryModal';

interface Props {
  id: number;
  initialContent?: string;
  onUpdate: () => void;
  className?: string;
}

export default function UpdateTextEntryForm({
  id,
  initialContent = '',
  onUpdate,
  className = '',
}: Props) {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <>
      <form
        className={`flex flex-col gap-3 ${className}`}
        ref={ref}
        action={async (data: FormData) => {
          await updateTextEntry(id, data);
          onUpdate();
        }}
      >
        <textarea
          className="textarea textarea-bordered"
          name="content"
          id="content-field"
          cols={15}
          rows={5}
          autoFocus={true}
          placeholder="Enter updated text"
        >
          {initialContent}
        </textarea>
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-error"
            type="button"
            onClick={() =>
              (
                document.getElementById(
                  'delete-text-entry-modal'
                ) as HTMLFormElement
              )?.showModal()
            }
          >
            Delete
          </button>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
        </div>
      </form>
      <DeleteTextEntryModal id={id} />
    </>
  );
}
