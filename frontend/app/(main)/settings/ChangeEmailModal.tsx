'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/lib/utils/setFormErrors';
import { changeEmailSchema, ChangeEmailSchema } from '@/lib/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import changeEmail from '@/lib/users/changeEmail';
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

interface Props {
  username: string;
}

export function ChangeEmailModal({ username }: Props) {
  const auth = useAuth();
  const router = useRouter();

  const form = useForm<ChangeEmailSchema>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      new_email: auth.user?.email || '',
      password: '',
    },
  });

  async function onSubmit(formData: ChangeEmailSchema) {
    const { data, error } = await changeEmail(username, formData);
    if (error) {
      setFormErrors(error, form.setError);
    } else {
      auth.updateUser();
      router.refresh();
    }
    return { data, error };
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change Email</DialogTitle>
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
            name="new_email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput label="New Email" autoFocus {...field} />
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
