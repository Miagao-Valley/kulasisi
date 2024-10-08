'use client';

import React, { useRef } from 'react';
import { useFormStatus } from 'react-dom';
import updateTextEntry from '@/lib/textEntries/updateTextEntry';
import DeleteTextEntryModal from './DeleteTextEntryModal';
import toast from 'react-hot-toast';

interface Props {
  id: number;
  initialContent?: string;
  onUpdate: () => void;
  className?: string;
}

interface UpdateButtonProps {
  disabled?: boolean;
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
          const promise = updateTextEntry(id, data);
          toast.promise(promise, {
            loading: 'Updating',
            success: 'Updated',
            error: 'Failed to update',
          });
          await promise;
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
          defaultValue={initialContent}
        ></textarea>
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
          <UpdateButton />
        </div>
      </form>
      <DeleteTextEntryModal id={id} />
    </>
  );
}

function UpdateButton({ disabled = false }: UpdateButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-primary"
      type="submit"
      disabled={disabled || pending}
    >
      {pending ? 'Updating...' : 'Update'}
    </button>
  );
}
