import React from 'react';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex justify-center">
      <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:1/2">
        <h1>Sign up</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
