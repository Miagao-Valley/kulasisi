import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import CustomToaster from './components/CustomToaster';

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
        <CustomToaster />
        <Navbar />
        <main className="custom-container">{children}</main>
      </body>
    </html>
  );
}
