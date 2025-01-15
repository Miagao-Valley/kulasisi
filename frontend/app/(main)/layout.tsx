import React from 'react';
import type { Metadata } from 'next';
import '../globals.css';
import { AuthProvider } from '../../components/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar/AppSidebar';
import AppHeader from '@/components/AppHeader';

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
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="h-12 flex gap-2 items-center shrink-0 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16">
                <AppHeader />
              </header>
              <main className="p-4 pt-0">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
