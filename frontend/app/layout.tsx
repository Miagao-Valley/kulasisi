import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../components/AuthProvider';
import Navbar from '../components/Navbar/Navbar';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Kulasisi',
  description: 'Kulasisi description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Toaster />
          <Navbar />
          <main className="custom-container">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
