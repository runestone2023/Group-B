
import { notification } from 'antd';
import {
  createContext,
  ReactNode,
  
} from 'react';

type NotificationType = 'success' | 'error';
type NotificationContent = {
  type: NotificationType;
  message: string;
  description?: ReactNode;
};
type NotificationContextType = {
  setNotification: (a: NotificationContent) => void;
};
export const NotificationContext = createContext<
  NotificationContextType
>({setNotification:()=>{}});
NotificationContext.displayName = 'NotificationContext';

export default function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (notification: NotificationContent) => {
    api[notification.type]({
      message: notification.message,
      description: notification.description,
      placement: 'top',
    });
  };
  return (
    <NotificationContext.Provider
      value={{
        setNotification: openNotification,
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}
