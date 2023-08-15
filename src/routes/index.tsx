import useAuth from '@/state/hooks/useAuth';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import Login from '../features/auth/routes/Login';
import getProtectedRoutes from './protected';

function AppRoutes() {
  // TODO: get user auth:w
  const { isSuperuser } = useAuth();

  const isAuth = true;

  const login: RouteObject[] = [{ path: '/auth/login', element: <Login /> }];

  const routes = isAuth ? getProtectedRoutes(isSuperuser()) : login;

  const element = useRoutes(
    routes.concat([{ path: '/', element: <Navigate replace to="/app" /> }])
  );

  return element;
}

export default AppRoutes;
