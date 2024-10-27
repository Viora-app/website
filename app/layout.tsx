import { ReactNode } from 'react';
import type { Metadata } from 'next';

import Providers from './context';

import './globals.css';

export const metadata: Metadata = {
  title: 'Viora',
  description: 'Empowering artists, connecting superfans',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className=""
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
