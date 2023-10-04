'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LoadingScreen from '@/components/LoadingScreen';
import { useAuthContext } from '@/context/AuthContext';

const AuthPageLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { token, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && token) {
      router.push('/dashboard');
    }
  }, [isLoading, token]);

  if (!isLoading && !token) {
    return (
      <main className="p-3 min-h-screen flex items-center justify-center">
        {children}
      </main>
    );
  }

  return <LoadingScreen />;
};

export default AuthPageLayout;
