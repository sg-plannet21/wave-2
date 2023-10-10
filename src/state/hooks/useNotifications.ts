import NotificationContext from '@/state/contexts/NotificationContext';
import { useContext } from 'react';

const useNotifications = () => useContext(NotificationContext);

export default useNotifications;
