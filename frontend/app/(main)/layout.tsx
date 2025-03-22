import React from 'react';
import { cookies, headers } from 'next/headers';
import type { Metadata } from 'next';
import '../globals.css';
import getOs from '@/lib/utils/getOs';
import { AuthProvider } from '../../components/providers/AuthProvider';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar/AppSidebar';
import { SiteHeader } from '@/components/app-sidebar/SiteHeader';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { KbdProvider } from '@/components/ui/kbd';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { Bricolage_Grotesque } from 'next/font/google';

export const font = Bricolage_Grotesque({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kulasisi',
  description: 'Kulasisi description',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const headersRes = await headers();
  const os = getOs(headersRes.get('user-agent'));
  const defaultOpen = cookieStore.get('sidebar_state')
    ? cookieStore.get('sidebar_state')?.value === 'true'
    : true;

  return (
    <html lang="en">
      <body className={font.className}>
        <div className="[--header-height:calc(theme(spacing.14))]">
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
                        <main className="p-4">{children}</main>
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
