'use client';

import React, { useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import updateDictEntry from '@/lib/dictEntries/updateDictEntry';

interface Props {
  id: number;
  initialDefinition?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdateDictEntryForm({
  id,
  initialDefinition = '',
  setIsEditing,
  className = '',
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [definition, setDefinition] = useState('');

  const handleDefinitionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setDefinition(newValue);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await updateDictEntry(id, formData);
    if (!res?.error) {
      setDefinition('');
      toast.success('Entry updated');
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
            className="textarea text-base w-full p-0 rounded-none overflow-hidden resize-none focus:outline-none focus:border-transparent"
            name="definition"
            id="definition-field"
            ref={textareaRef}
            rows={1}
            autoFocus={true}
            placeholder="Enter updated text"
            defaultValue={initialDefinition}
            value={definition}
            onChange={handleDefinitionChange}
          ></textarea>
          {formState?.error?.definition && (
            <div role="alert" className="text-sm text-error">
              {formState.error.definition[0]}
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
            disabled={!definition.trim() || definition == initialDefinition}
          />
        </div>
      </form>
    </>
  );
}

interface UpdateButtonProps {
  disabled?: boolean;
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
