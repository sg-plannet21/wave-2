import { createContext } from 'react';

export interface INotification {
  id: number;
  title: string;
  message?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

export interface INotificationContext {
  notifications: INotification[];
  addNotification: (notification: Omit<INotification, 'id'>) => void;
  dismissNotification: (notificationId: number) => void;
}

const defaultValue: INotificationContext = {
  notifications: [],
  addNotification: () => undefined,
  dismissNotification: () => undefined,
};

const NotificationContext = createContext<INotificationContext>(defaultValue);

export default NotificationContext;
