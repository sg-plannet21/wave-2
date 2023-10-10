import NotificationContext, {
  INotification,
  INotificationContext,
} from '@/state/contexts/NotificationContext';
import { useCallback, useMemo, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

let notificationId = 0;

function NotificationProvider({ children }: Props) {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification: INotificationContext['addNotification'] = useCallback(
    (notification) =>
      setNotifications((existingNotifications) =>
        existingNotifications.concat({
          ...notification,
          id: notificationId++,
        })
      ),
    []
  );

  const dismissNotification: INotificationContext['dismissNotification'] =
    useCallback(
      (id) =>
        setNotifications((existingNotifications) =>
          existingNotifications.filter((notification) => notification.id !== id)
        ),
      []
    );

  const memoedValues = useMemo(
    () => ({
      notifications,
      addNotification,
      dismissNotification,
    }),
    [notifications, addNotification, dismissNotification]
  );

  return (
    <NotificationContext.Provider value={memoedValues}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
