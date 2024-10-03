import React from 'react';
import deleteTextEntry from '@/lib/textEntries/deleteTextEntry';

interface Props {
  id: number;
}
export default function DeleteTextEntryModal({ id }: Props) {
  return (
    <dialog
      id="delete-text-entry-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3>Are you sure?</h3>
        <p className="py-4">
          Do you really want to delete this post? This process cannot be undone.
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
          <form
            action={async () => {
              await deleteTextEntry(id);
            }}
          >
            <button className="btn btn-error">Delete</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
