import { ReactQueryDevtools } from 'react-query/devtools';
import AppRoutes from '@/routes';
import AuthProvider from '@/state/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import Notifications from '@/components/Feedback/Notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import React from 'react';
import Button from './components/Inputs/Button';
import LoadingComponent from './components/Feedback/LoadingComponent';

const queryClient = new QueryClient();

function ErrorFallback() {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
}

function App() {
  return (
    <React.Suspense fallback={<LoadingComponent />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>
              <Notifications />
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
}

export default App;
