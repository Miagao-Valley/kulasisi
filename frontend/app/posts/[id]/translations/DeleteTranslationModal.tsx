'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import deleteTranslation from '@/lib/translations/deleteTranslation';
import { FaTrash } from 'react-icons/fa';

interface Props {
  textEntryId: number;
  id: number;
}

export default function DeleteTranslationModal({ textEntryId, id }: Props) {
  return (
    <dialog
      id={`delete-translation-modal-${id}`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3>Are you sure?</h3>
        <p className="py-4">
          Do you really want to delete this translation? This process cannot be
          undone.
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
          <form
            action={async () => {
              await deleteTranslation(textEntryId, id);
              toast.error(() => <span>Translation deleted</span>, {
                icon: <FaTrash />,
              });
            }}
          >
            <DeleteButton />
          </form>
        </div>
      </div>
    </dialog>
  );
}

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-error" type="submit" disabled={pending}>
      {pending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
