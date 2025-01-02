'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import login from '@/lib/auth/login';
import { useForm, SubmitHandler } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
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

export interface LoginInputs {
  username: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();

  const next = searchParams.get('next');

  const form = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = async (data: LoginInputs) => {
    const res = await login(data);
    if (res?.error) {
      setFormErrors(res.error, form.setError);
    } else {
      auth.updateAuth();
      if (next) {
        router.push(next);
      }
    }
    return res;
  };

  return (
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

        <LoadingButton
          className="w-full"
          type="submit"
          loading={form.formState.isSubmitting}
        >
          Sign in
        </LoadingButton>

        <p className="text-center">
          Don't have an account? <Link href={`/auth/register/`}>Sign up</Link>
        </p>
      </form>
    </Form>
  );
}
