'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LoadingScreen from '@/components/LoadingScreen';
import { useAuthContext } from '@/context/AuthContext';

const ProtectedPageLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { token, isLoading } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/login');
    }
  }, [isLoading, token]);

  if (!isLoading && token) {
    return (
      <div className="mx-4 my-6 flex flex-col items-center">{children}</div>
    );
  }

  return <LoadingScreen />;
};

export default ProtectedPageLayout;
