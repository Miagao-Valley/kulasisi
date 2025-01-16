'use client';

import React from 'react';
import { User } from '@/types/users';
import { ChangeEmailModal } from './ChangeEmailModal';
import { ChangePhoneNumberModal } from './ChangePhoneNumberModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { DeleteAccountModal } from './DeleteAccountModal';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { H2, H3 } from '@/components/ui/heading-with-anchor';
import { PenIcon } from 'lucide-react';

interface Props {
  user: User;
}

export default function AccountTab({ user }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <H2 anchor="general">General</H2>

        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <H3 className="!text-base m-0 me-auto" anchor="email-address">
              Email
            </H3>

            <span className="text-xs truncate">{user.email}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PenIcon />
                </Button>
              </DialogTrigger>
              <ChangeEmailModal username={user.username} />
            </Dialog>
          </li>

          <li className="flex items-center gap-3">
            <H3 className="!text-base m-0 me-auto" anchor="phone-number">
              Phone number
            </H3>

            <span className="text-xs truncate">{user.phone_number}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PenIcon />
                </Button>
              </DialogTrigger>
              <ChangePhoneNumberModal username={user.username} />
            </Dialog>
          </li>

          <li className="flex items-center gap-3">
            <H3 className="!text-base m-0 me-auto" anchor="password">
              Password
            </H3>

            <Dialog>
              <DialogTrigger asChild>
                <Button  variant="ghost" size="icon">
                  <PenIcon />
                </Button>
              </DialogTrigger>
              <ChangePasswordModal username={user.username} />
            </Dialog>
          </li>
        </ul>
      </div>

      <div>
        <H2 anchor="danger">Danger</H2>

        <ul className="flex flex-col gap-4">
          <li className="flex items-center gap-3">
            <H3 className="!text-base m-0 me-auto" anchor="delete-account">
              Delete Account
            </H3>

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
