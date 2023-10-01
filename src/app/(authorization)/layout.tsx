'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LoadingScreen from '@/components/LoadingScreen';
import { useUserContext } from '@/context/UserContext';

type Props = {
  children: ReactNode;
};

const AuthPageLayout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { token, isLoading } = useUserContext();

  useEffect(() => {
    if (!isLoading && token) {
      router.push('/dashboard');
    }
  }, [isLoading, token]);

  if (!isLoading && !token) {
    return children;
  }

  return <LoadingScreen />;
};

export default AuthPageLayout;
