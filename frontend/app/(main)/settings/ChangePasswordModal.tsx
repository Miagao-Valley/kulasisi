'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/lib/utils/setFormErrors';
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from '@/lib/schemas/users';
import { zodResolver } from '@hookform/resolvers/zod';
import changePassword from '@/lib/users/changePassword';
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

interface Props {
  username: string;
}

export function ChangePasswordModal({ username }: Props) {
  const router = useRouter();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      new_password: '',
    },
  });

  async function onSubmit(formData: ChangePasswordSchema) {
    const { data, error } = await changePassword(username, formData);
    if (error) {
      setFormErrors(error, form.setError);
    } else {
      router.refresh();
    }
    return { data, error };
  }

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
