import React from 'react';

interface Props {
  name: string;
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  error?: string;
  autoFocus?: boolean;
}

export default function AuthInputField({
  name,
  type,
  placeholder,
  icon,
  error,
  autoFocus,
}: Props) {
  return (
    <div>
      <label
        className={`input input-bordered ${
          error && 'input-error'
        } flex items-center gap-3`}
      >
        <span>{icon}</span>
        <input
          className="grow w-full"
          name={name}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      </label>
      {error && (
        <div role="alert" className="text-sm text-error">
          {error[0]}
        </div>
      )}
    </div>
  );
}
