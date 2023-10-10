import useUserRoutes from '@/hooks/useUserRoutes';
import { useRoutes } from 'react-router-dom';

function AppRoutes() {
  const routes = useUserRoutes();

  return useRoutes(routes);
}

export default AppRoutes;
