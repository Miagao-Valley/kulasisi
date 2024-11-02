'use client';

import React, { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import updateTextEntry from '@/lib/textEntries/updateTextEntry';
import toast from 'react-hot-toast';

interface Props {
  id: number;
  initialContent?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

interface UpdateButtonProps {
  disabled?: boolean;
}

export default function UpdateTextEntryForm({
  id,
  initialContent = '',
  setIsEditing,
  className = '',
}: Props) {
  const [content, setContent] = useState('');

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await updateTextEntry(id, formData);
    if (!res?.error) {
      setContent('');
      toast.success('Updated');
      setIsEditing(false);
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
            className="btn"
            type="button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
          <UpdateButton
            disabled={!content.trim() || content == initialContent}
          />
        </div>
      </form>
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
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}
