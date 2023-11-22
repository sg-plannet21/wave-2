import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { Route } from '../types';

const routeClient = new ApiClient<Route>('/routes');

function useRoutes() {
  return useQuery({
    queryKey: 'routes',
    queryFn: routeClient.getAll,
  });
}

export default useRoutes;
