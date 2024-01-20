import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/resources/css/globals.css';
import { PropsWithChildren } from 'react';
import { cn } from '@/common/utils/ui';
import { getEnv } from '@/common/config/env';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: getEnv.public.appName,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
