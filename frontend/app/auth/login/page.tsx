import React from 'react';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="flex justify-center">
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:1/2">
        <h1>Sign in</h1>
        <LoginForm />
      </div>
    </div>
  );
}
