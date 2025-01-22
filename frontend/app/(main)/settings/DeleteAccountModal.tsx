'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/components/providers/AuthProvider';
import logout from '@/lib/auth/logout';
import deleteUser from '@/lib/users/deleteUser';
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
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { PasswordInput } from '@/components/ui/password-input';
import { LoadingButton } from '@/components/ui/loading-button';

export interface DeleteAccountInputs {
  username: string;
  password: string;
}

interface Props {
  username: string;
}

export function DeleteAccountModal({ username }: Props) {
  const router = useRouter();
  const auth = useAuth();

  const form = useForm<DeleteAccountInputs>();

  const onSubmit: SubmitHandler<DeleteAccountInputs> = async (
    data: DeleteAccountInputs,
  ) => {
    const res = await deleteUser(username, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      await logout();
      auth.updateAuth();
      router.push('/register/');
    }
    return res;
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogDescription>
          Do you really want to <b>DELETE</b> your account?
          <br />
          This process cannot be undone.
          <br />
          <br />
          Please type your username and password to confirm.
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput label="Username" autoFocus {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PasswordInput label="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="ms-auto flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <LoadingButton
              variant="destructive"
              type="submit"
              loading={form.formState.isSubmitting}
            >
              Delete
            </LoadingButton>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
