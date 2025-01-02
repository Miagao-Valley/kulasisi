'use client';

import React from 'react';
import { User } from '@/types/users';
import { ChangeEmailModal } from './ChangeEmailModal';
import { ChangePhoneNumberModal } from './ChangePhoneNumberModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { DeleteAccountModal } from './DeleteAccountModal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

interface Props {
  user: User;
}

export default function AccountTab({ user }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2>General</h2>

        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <h3 className="text-base me-auto m-0">Email address</h3>

            <span>{user.email}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Change</Button>
              </DialogTrigger>
              <ChangeEmailModal username={user.username} />
            </Dialog>
          </li>

          <li className="flex items-center gap-3">
            <h3 className="text-base me-auto m-0">Phone number</h3>

            <span>{user.phone_number}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Change</Button>
              </DialogTrigger>
              <ChangePhoneNumberModal username={user.username} />
            </Dialog>
          </li>

          <li className="flex items-center gap-3">
            <h3 className="text-base me-auto m-0">Password</h3>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Change</Button>
              </DialogTrigger>
              <ChangePasswordModal username={user.username} />
            </Dialog>
          </li>
        </ul>
      </div>

      <div>
        <h2>Danger</h2>

        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <h3 className="text-base me-auto m-0">Delete Account</h3>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DeleteAccountModal username={user.username} />
            </Dialog>
          </li>
        </ul>
      </div>
    </div>
  );
}
