import React from 'react';
import type { Metadata } from 'next';
import { font } from '../(main)/layout';
import '../globals.css';
import { AuthProvider } from '../../components/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';
import Wordmark from '@/components/brand/wordmark';

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
              <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                  <div className="flex gap-2 justify-between">
                    <Link
                      href="/"
                      className="flex items-center gap-1 text-primary"
                    >
                      <Wordmark className="w-24" />
                    </Link>
                    <ThemeToggle />
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">{children}</div>
                  </div>
                </div>
                <div className="relative hidden lg:block opacity-[0.9]">
                  <img
                    src="/kulasisi-illustration.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.9] dark:opacity-[0.7] brightness-[0.8] dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </div>
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
