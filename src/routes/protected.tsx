import MainLayout from '@/components/Layout/MainLayout';
import { Outlet, RouteObject } from 'react-router-dom';

function App() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
const protectedRoutes: RouteObject[] = [{ path: '/app' }];

export default protectedRoutes;
