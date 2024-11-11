'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';
import changePassword from '@/lib/users/changePassword';
import AuthInputField from '../auth/AuthInputField';

interface Props {
  username: string;
}

export function ChangePasswordModal({ username }: Props) {
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await changePassword(username, formData);
    if (!res?.error) {
      auth.updateAuth();
      router.refresh();
    }
    return res;
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <dialog
      id="change-password-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3>Change Password</h3>
        <p className="py-4">
          Please type your <b>current password</b> to verify.
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
            name="current_password"
            type="password"
            placeholder="Current password"
            error={formState?.error?.current_password}
            autoFocus={true}
          />
          <AuthInputField
            name="new_password"
            type="password"
            placeholder="New Password"
            error={formState?.error?.new_password}
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <SubmitButton />
          </div>
        </form>
      </div>
    </dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}
