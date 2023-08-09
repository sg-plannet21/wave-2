import { createBrowserRouter } from 'react-router-dom';
import Login from '../features/auth/routes/Login';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
