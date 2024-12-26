'use client';

import React, { useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';
import updateDefinition from '@/lib/definitions/updateDefinition';

interface Props {
  dictEntryId: number;
  id: number;
  initialDescription?: string;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export default function UpdateDefinitionForm({
  dictEntryId,
  id,
  initialDescription = '',
  setIsEditing,
  className = '',
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [description, setDescription] = useState('');

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    setDescription(newValue);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await updateDefinition(dictEntryId, id, formData);
    if (!res?.error) {
      setDescription('');
      toast.success('Definition updated');
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
            name="description"
            id="description-field"
            ref={textareaRef}
            rows={1}
            autoFocus={true}
            placeholder="Enter updated definition"
            defaultValue={initialDescription}
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          {formState?.error?.description && (
            <div role="alert" className="text-sm text-error">
              {formState.error.description[0]}
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
            disabled={!description.trim() || description == initialDescription}
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
