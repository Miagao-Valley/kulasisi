import React from 'react';
import type { Metadata } from 'next';
import { siteMetadata } from '../(main)/layout';
import { font } from '../(main)/layout';
import '../globals.css';
import Link from 'next/link';
import { AuthProvider } from '../../components/providers/AuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { ThemeToggle } from '@/components/app-sidebar/ThemeToggle';
import { AppWordmark } from '@/components/brand/app-wordmark';
import Image from 'next/image';

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.baseUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: new URL(siteMetadata.imagePath, siteMetadata.baseUrl).href,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: siteMetadata.twitterHandle,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [new URL(siteMetadata.imagePath, siteMetadata.baseUrl).href],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Toaster />
              <main>
                <div className="grid min-h-svh lg:grid-cols-2">
                  <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex gap-2 justify-between">
                      <Link
                        href="/"
                        className="flex items-center gap-1 text-primary"
                      >
                        <AppWordmark className="w-24" />
                      </Link>
                      <ThemeToggle />
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                      <div className="w-full max-w-xs">{children}</div>
                    </div>
                  </div>
                  <div className="relative hidden lg:block opacity-[0.9]">
                    <Image
                      src="/images/kulasisi-illustration.png"
                      alt="Image"
                      fill
                      className="absolute inset-0 h-full w-full object-cover opacity-[0.9] dark:opacity-[0.7] brightness-[0.8] dark:brightness-[0.2] dark:grayscale"
                    />
                  </div>
                </div>
              </main>
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
