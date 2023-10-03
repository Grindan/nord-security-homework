'use client';

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';

import {
  loadAuthToken,
  saveAuthToken,
  removeAuthToken,
} from '@/utils/localStorage';
import authApi from '@/api/auth';

export type ContextType = {
  isLoading: boolean;
  token: string | null;
  setToken: (token: string) => void;
};

const AuthContext = createContext<ContextType>({
  isLoading: true,
  token: null,
  setToken: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const updateToken = (newToken: string) => {
    setToken(newToken);
    saveAuthToken(newToken);
    authApi.setHeader(newToken);
  };

  useEffect(() => {
    const loadedToken = loadAuthToken();
    if (loadedToken) {
      updateToken(loadedToken);
    }
    setIsLoading(false);
  }, [isLoading]);

  const logout = () => {
    setToken(null);
    removeAuthToken();
    authApi.logout();
  };

  const value = useMemo(
    () => ({
      isLoading,
      token,
      setToken: updateToken,
      logout,
    }),
    [isLoading, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error(
      'useAuthContext must be use as a child of the AuthProvider',
    );
  }

  return contextValue;
}
