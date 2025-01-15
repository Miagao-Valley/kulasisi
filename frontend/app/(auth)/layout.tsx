import React from 'react';
import type { Metadata } from 'next';
import '../globals.css';
import { AuthProvider } from '../../components/AuthProvider';
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
            <main>
              {children}
            </main>
        </AuthProvider>
      </body>
    </html>
  );
}
