import React from 'react';
import type { Metadata } from 'next';
import '../globals.css';
import { AuthProvider } from '../../components/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { font } from '../(main)/layout';

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
      <body className={font.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <main>
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
