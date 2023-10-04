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

export type ContextType = {
  add: (text: string) => void;
};

type Notification = {
  id: number;
  text: string;
};

const NotificationsContext = createContext<ContextType>({
  add: () => {},
});

export const NotificationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  useEffect(() => {}, []);

  const add = (text: string) => {
    const id = new Date().getTime();
    setNotifications([...notifications, { id, text }]);

    setTimeout(
      (notificationId: number) => {
        setNotifications(
          notifications.filter((item) => item.id !== notificationId),
        );
      },
      2000,
      id,
    );
  };

  const value = useMemo(
    () => ({
      notifications,
      add,
    }),
    [notifications, add],
  );

  return (
    <NotificationsContext.Provider value={value}>
      {children}
      <div className="absolute top-3 left-2 right-2 md:left-auto md:right-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex justify-between md:w-[400px] bg-[#f44336] rounded px-2 py-1 md:px-3 md:py-2 mb-3 md:mb-3"
          >
            <p className="text-white text-center text-xs md:text-sm">
              {notification.text}
            </p>
          </div>
        ))}
      </div>
    </NotificationsContext.Provider>
  );
};

export function useNotificationsContext() {
  const contextValue = useContext(NotificationsContext);

  if (!contextValue) {
    throw new Error(
      'useNotificationsContext must be use as a child of the NotificationsProvider',
    );
  }

  return contextValue;
}
