import React from 'react';
import { cookies, headers } from 'next/headers';
import type { Metadata } from 'next';
import '../globals.css';
import { getOs } from '@/lib/utils/getOs';
import { AuthProvider } from '../../components/providers/AuthProvider';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar/AppSidebar';
import { SiteHeader } from '@/components/app-sidebar/SiteHeader';
import { Footer } from '@/components/footer/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { KbdProvider } from '@/components/ui/kbd';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { Bricolage_Grotesque } from 'next/font/google';

export const font = Bricolage_Grotesque({ subsets: ['latin'] });

export const siteMetadata = {
  title: 'Kulasisi',
  description:
    'Kulasisi is a collaborative community for Philippine languages.',
  keywords: [
    'Languages',
    'Philippines',
    'Filipino',
    'Tagalog',
    'Phrasebook',
    'Dictionary',
  ],
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  imagePath: '/images/kulasisi-illustration.png',
  twitterHandle: '@kulasisi',
};

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headersRes = await headers();
  const os = getOs(headersRes.get('user-agent'));
  const defaultOpen = cookieStore.get('sidebar_state')
    ? cookieStore.get('sidebar_state')?.value === 'true'
    : true;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <div className="[--header-height:calc(--spacing(14))]">
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <KbdProvider OS={os}>
                <TooltipProvider>
                  <Toaster />
                  <SidebarProvider
                    defaultOpen={defaultOpen}
                    className="flex flex-col"
                  >
                    <SiteHeader />
                    <div className="flex flex-1">
                      <AppSidebar />
                      <SidebarInset>
                        <div className="flex flex-col w-full min-h-screen">
                          <main className="p-4 grow">{children}</main>
                          <Footer />
                        </div>
                      </SidebarInset>
                    </div>
                  </SidebarProvider>
                </TooltipProvider>
              </KbdProvider>
            </ThemeProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
