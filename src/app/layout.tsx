import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AuthProvider } from '@/context/AuthContext';
import { NotificationsProvider } from '@/context/NotificationsContext';
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
      <link rel="icon" type="image/svg+xml" href="/images/favicon.ico" />
      <AuthProvider>
        <body className={`${inter.className} bg-slate-100`}>
          <NotificationsProvider>{children}</NotificationsProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
