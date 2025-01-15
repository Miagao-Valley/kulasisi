'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import changePhoneNumber from '@/lib/users/changePhoneNumber';
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

export interface ChangePhoneNumberInputs {
  new_phone_number: string;
  password: string;
}

interface Props {
  username: string;
}

export function ChangePhoneNumberModal({ username }: Props) {
  const router = useRouter();

  const form = useForm<ChangePhoneNumberInputs>();

  const onSubmit: SubmitHandler<ChangePhoneNumberInputs> = async (
    data: ChangePhoneNumberInputs,
  ) => {
    const res = await changePhoneNumber(username, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      router.refresh();
    }
    return res;
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change Phone Number</DialogTitle>
        <DialogDescription>
          Please type your password to verify.
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
            name="new_phone_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    label="New Phone Number"
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
            <LoadingButton type="submit" loading={form.formState.isSubmitting}>
              Save
            </LoadingButton>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
