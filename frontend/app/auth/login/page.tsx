import React from 'react';
import LoginForm from './LoginForm';
import { H1 } from '@/components/ui/heading-with-anchor';

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:1/2">
        <H1>Sign in</H1>
        <LoginForm />
      </div>
    </div>
  );
}
