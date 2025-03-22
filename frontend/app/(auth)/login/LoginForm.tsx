'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/providers/AuthProvider';
import login from '@/lib/auth/login';
import { useForm } from 'react-hook-form';
import setFormErrors from '@/utils/setFormErrors';
import { loginSchema, LoginSchema } from '@/lib/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
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
import Logo from '@/components/brand/logo';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();

  const next = searchParams.get('next');

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(formData: LoginSchema) {
    const { data, error } = await login(formData);
    if (error) {
      setFormErrors(error, form.setError);
    } else {
      auth.updateAuth();
      auth.updateUser();
      router.push(next || '/');
    }
    return { data, error };
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-1">
        <Link href="/" className="flex flex-col items-center">
          <Logo className="w-12 mb-4" />
          <span className="sr-only">kulasisi</span>
        </Link>
        <h1 className="text-xl font-bold">Welcome to kulasisi</h1>
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link href="/register/" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>

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
        </form>
      </Form>
    </div>
  );
}
