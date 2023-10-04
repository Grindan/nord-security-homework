'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import LoadingScreen from '@/components/LoadingScreen';
import { useAuthContext } from '@/context/AuthContext';
import LogoutIcon from '@/components/icons/LogoutIcon';

const ProtectedPageLayout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { token, isLoading, logout } = useAuthContext();

  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/login');
    }
  }, [isLoading, token]);

  const onLogoutClick = () => {
    logout();
  };

  if (!isLoading && token) {
    return (
      <>
        <header className="h-[60px] w-full border-b bg-white flex items-center justify-end px-4 py-3">
          <LogoutIcon className="cursor-pointer" onClick={onLogoutClick} />
        </header>
        <main className="mx-4 my-6 flex flex-col items-center">{children}</main>
      </>
    );
  }

  return <LoadingScreen />;
};

export default ProtectedPageLayout;
