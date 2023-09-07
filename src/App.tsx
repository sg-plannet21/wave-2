import Notifications from '@/components/Notifications/Notifications';
import AppRoutes from '@/routes';
import AuthProvider from '@/state/AuthProvider';
import NotificationProvider from '@/state/NotificationProvider';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <BrowserRouter>
          <Notifications />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
