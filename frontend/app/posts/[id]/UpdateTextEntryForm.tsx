'use client';

import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
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
  const [content, setContent] = useState('');

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const promise = updateTextEntry(id, formData);
    const res = await promise;
    if (!res?.error) {
      setContent('');
      toast.success('Updated');
      onUpdate();
    }
    return res;
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <>
      <form className={`flex flex-col gap-3 ${className}`} action={formAction}>
        {formState?.error?.detail && (
          <div role="alert" className="text-sm text-error">
            {formState.error.detail}
          </div>
        )}
        {formState?.error?.non_field_errors && (
          <div role="alert" className="text-sm text-error">
            {formState.error.non_field_errors[0]}
          </div>
        )}
        <div>
          <textarea
            className="textarea textarea-bordered w-full"
            name="content"
            id="content-field"
            cols={15}
            rows={5}
            autoFocus={true}
            placeholder="Enter updated text"
            defaultValue={initialContent}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          {formState?.error?.content && (
            <div role="alert" className="text-sm text-error">
              {formState.error.content[0]}
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-error"
            type="button"
            onClick={() =>
              (
                document.getElementById(
                  'delete-text-entry-modal',
                ) as HTMLFormElement
              )?.showModal()
            }
          >
            Delete
          </button>
          <UpdateButton
            disabled={!content.trim() || content == initialContent}
          />
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
