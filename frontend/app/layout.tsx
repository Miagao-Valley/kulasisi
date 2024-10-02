import type { Metadata } from 'next';
import './globals.css';

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
        <main className="custom-container">{children}</main>
      </body>
    </html>
  );
}
