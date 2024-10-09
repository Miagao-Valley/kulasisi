import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import CustomToaster from './components/CustomToaster';
import { AuthProvider } from './components/AuthProvider';
import Navbar from './components/Navbar/Navbar';

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
    <html lang="en" data-theme="cupcake">
      <body>
        <AuthProvider>
          <CustomToaster />
          <Navbar />
          <main className="custom-container">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
