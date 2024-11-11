'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import changePhoneNumber from '@/lib/users/changePhoneNumber';
import AuthInputField from '../auth/AuthInputField';

interface Props {
  username: string;
}

export function ChangePhoneNumberModal({ username }: Props) {
  const router = useRouter();

  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res = await changePhoneNumber(username, formData);
    if (!res?.error) {
      router.refresh();
    }
    return res;
  };

  const [formState, formAction] = useFormState(handleSubmit, null);

  return (
    <dialog
      id="change-phone-number-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <h3>Change Phone Number</h3>
        <p className="py-4">
          Please type your <b>password</b> to verify.
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
            name="new_phone_number"
            type="tel"
            placeholder="New phone number"
            error={formState?.error?.new_phone_number}
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
