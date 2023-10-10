import AppRoutes from '@/routes';
import AuthProvider from '@/state/AuthProvider';
import NotificationProvider from '@/state/NotificationProvider';
import { BrowserRouter } from 'react-router-dom';
import Notifications from '@/components/Feedback/Notifications';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AuthProvider>
          <BrowserRouter>
            <Notifications />
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
