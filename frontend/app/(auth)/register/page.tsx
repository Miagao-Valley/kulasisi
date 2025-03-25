import React from 'react';
import { Metadata } from 'next';
import { RegisterForm } from './RegisterForm';

export const metadata: Metadata = {
  title: 'Sign Up for Kulasisi',
  description: 'Create your account to join our community.',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
