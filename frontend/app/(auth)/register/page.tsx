import React from 'react';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-svh flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
