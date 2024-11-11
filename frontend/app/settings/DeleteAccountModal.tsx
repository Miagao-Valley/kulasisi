'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useAuth } from '../components/AuthProvider';
import deleteUser from '@/lib/users/deleteUser';
import AuthInputField from '../auth/AuthInputField';

interface Props {
  username: string;
}

export function DeleteAccountModal({ username }: Props) {
  const auth = useAuth();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await deleteUser(username, formData);
    if (!res?.error) {
      await fetch('/api/logout');
      auth.updateAuth();
    }
    return res;
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <dialog
      id="delete-account-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3>Are you sure?</h3>
        <p className="py-4">
          Do you really want to DELETE your account? This process cannot be
          undone.
          <br />
          Please type your <b>username</b> and <b>password</b> to confirm.
        </p>
        <form className="flex flex-col gap-3" action={formAction}>
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
          <AuthInputField
            name="username"
            type="text"
            placeholder="Username"
            error={formState?.error?.username}
            autoFocus={true}
          />
          <AuthInputField
            name="password"
            type="password"
            placeholder="Password"
            error={formState?.error?.password}
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <DeleteButton />
          </div>
        </form>
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
