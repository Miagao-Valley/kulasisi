'use client';

import React from 'react';
import { User } from '@/types';
import { ChangeEmailModal } from './ChangeEmailModal';
import { ChangePhoneNumberModal } from './ChangePhoneNumberModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { DeleteAccountModal } from './DeleteAccountModal';

interface Props {
  user: User;
}

export default function AccountTab({ user }: Props) {
  const showModal = (id: string) => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    modal?.showModal();
  };

  return (
    <>
      <ChangeEmailModal username={user.username} />
      <ChangePhoneNumberModal username={user.username} />
      <ChangePasswordModal username={user.username} />
      <DeleteAccountModal username={user.username} />

      <div className="flex flex-col gap-5">
        <div>
          <h2>General</h2>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-3">
              <h3 className="text-base me-auto m-0">Email address</h3>
              <span>{user.email}</span>
              <button
                className="btn btn-sm"
                onClick={() => showModal('change-email-modal')}
              >
                Change
              </button>
            </li>
            <li className="flex items-center gap-3">
              <h3 className="text-base me-auto m-0">Phone number</h3>
              <span>{user.phone_number}</span>
              <button
                className="btn btn-sm"
                onClick={() => showModal('change-phone-number-modal')}
              >
                Change
              </button>
            </li>
            <li className="flex items-center gap-3">
              <h3 className="text-base me-auto m-0">Password</h3>
              <button
                className="btn btn-sm"
                onClick={() => showModal('change-password-modal')}
              >
                Change
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h2>Danger</h2>
          <ul className="flex flex-col gap-5">
            <li>
              <button
                className="btn btn-error btn-sm"
                onClick={() => showModal('delete-account-modal')}
              >
                Delete Account
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
