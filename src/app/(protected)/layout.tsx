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
  }, [router, isLoading, token]);

  const onLogoutClick = () => {
    logout();
  };

  if (!isLoading && token) {
    return (
      <>
        <header className="fixed h-[50px] md:h-[60px] w-full border-b bg-white flex items-center justify-end px-4 py-3">
          <LogoutIcon
            className="cursor-pointer opacity-70 hover:opacity-100 w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
            onClick={onLogoutClick}
            tabIndex={0}
            aria-label="Logout"
          />
        </header>
        <main className="p-3 pt-[60px] md:pt-[75px] flex flex-col items-center">
          {children}
        </main>
      </>
    );
  }

  return <LoadingScreen />;
};

export default ProtectedPageLayout;
