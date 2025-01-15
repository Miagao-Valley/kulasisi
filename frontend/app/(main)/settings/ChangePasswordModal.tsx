'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useForm, SubmitHandler } from 'react-hook-form';
import changePassword from '@/lib/users/changePassword';
import setFormErrors from '@/utils/setFormErrors';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { LoadingButton } from '@/components/ui/loading-button';

export interface ChangePasswordInputs {
  current_password: string;
  new_password: string;
}

interface Props {
  username: string;
}

export function ChangePasswordModal({ username }: Props) {
  const auth = useAuth();
  const router = useRouter();

  const form = useForm<ChangePasswordInputs>();

  const onSubmit: SubmitHandler<ChangePasswordInputs> = async (
    data: ChangePasswordInputs,
  ) => {
    const res = await changePassword(username, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      auth.updateAuth();
      router.refresh();
    }
    return res;
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change Password</DialogTitle>
        <DialogDescription>
          Please type your current password to verify.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormMessage>
            {form.formState.errors.root?.serverError.message}
          </FormMessage>

          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput
                    label="Current Password"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput label="New Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="ms-auto flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Save
            </LoadingButton>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
