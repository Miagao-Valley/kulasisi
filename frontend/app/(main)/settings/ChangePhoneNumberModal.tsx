'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import changePhoneNumber from '@/lib/users/changePhoneNumber';
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

export const changePhoneNumberSchema = z.object({
  new_phone_number: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  password: z.string().min(1, 'Password is required'),
});

export type ChangePhoneNumberSchema = z.infer<typeof changePhoneNumberSchema>;

interface Props {
  username: string;
}

export function ChangePhoneNumberModal({ username }: Props) {
  const auth = useAuth();
  const router = useRouter();

  const form = useForm<ChangePhoneNumberSchema>({
    resolver: zodResolver(changePhoneNumberSchema),
    defaultValues: {
      new_phone_number: auth.user?.phone_number || '',
      password: '',
    },
  });

  async function onSubmit(data: ChangePhoneNumberSchema) {
    const res = await changePhoneNumber(username, data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      auth.updateUser();
      router.refresh();
    }
    return res;
  }

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
