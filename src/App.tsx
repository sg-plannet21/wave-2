import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import AuthProvider from './state/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
