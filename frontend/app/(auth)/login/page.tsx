import React from 'react';
import { Metadata } from 'next';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Sign in to Kulasisi',
  description: 'Access your account securely.',
};

export default function LoginPage() {
  return <LoginForm />;
}
