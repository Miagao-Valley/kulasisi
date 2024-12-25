import React from 'react';
import toast from 'react-hot-toast';
import deleteDictEntry from '@/lib/dictEntries/deleteDictEntry';
import { FaTrash } from 'react-icons/fa';
import { useFormStatus } from 'react-dom';

interface Props {
  id: number;
}

export default function DeleteDictEntryModal({ id }: Props) {
  return (
    <dialog
      id="delete-dict-entry-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3>Are you sure?</h3>
        <p className="py-4">
          Do you really want to delete this entry? This process cannot be undone.
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
          <form
            action={async () => {
              await deleteDictEntry(id);
              toast.error(() => <span>Entry deleted</span>, {
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
