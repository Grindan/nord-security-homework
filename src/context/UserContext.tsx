'use client';

import {
  FC,
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from 'react';

import { loadAuthToken } from '@/utils/localStorage';

export type ContextType = {
  isLoading: boolean;
  token: string | null;
};

const UserContext = createContext<ContextType>({
  isLoading: true,
  token: null,
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadedToken = loadAuthToken();
    if (loadedToken) {
      setToken(loadedToken);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isLoading]);

  const value = useMemo(
    () => ({
      isLoading,
      token,
    }),
    [isLoading, token],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  const contextValue = useContext(UserContext);

  if (!contextValue) {
    throw new Error(
      'useUserContext must be use as a child of the UserProvider',
    );
  }

  return contextValue;
}
