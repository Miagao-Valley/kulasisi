import React from 'react';
import RegisterForm from './RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex justify-center">
      <div className="xl:w-1/3 lg:w-1/2 md:w-3/4">
        <RegisterForm />
      </div>
    </div>
  );
}
