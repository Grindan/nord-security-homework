import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { UserProvider } from '@/context/UserContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hometask',
  description: 'Nord Security hometask - NordLayer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${inter.className} bg-slate-100`}>{children}</body>
      </UserProvider>
    </html>
  );
}
