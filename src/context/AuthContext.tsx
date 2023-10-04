'use client';

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
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
  logout: () => void;
};

const AuthContext = createContext<ContextType>({
  isLoading: true,
  token: null,
  setToken: () => {},
  logout: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  const updateToken = useCallback((newToken: string) => {
    setToken(newToken);
    saveAuthToken(newToken);
    authApi.setHeader(newToken);
  }, []);

  useEffect(() => {
    if (isLoading && !token) {
      const loadedToken = loadAuthToken();
      if (loadedToken) {
        updateToken(loadedToken);
      }
      setIsLoading(false);
    }
  }, [isLoading, token, updateToken]);

  const logout = useCallback(() => {
    setToken(null);
    removeAuthToken();
    authApi.logout();
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      token,
      setToken: updateToken,
      logout,
    }),
    [isLoading, token, updateToken, logout],
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
