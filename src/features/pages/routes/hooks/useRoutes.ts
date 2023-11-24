import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { Route } from '../types';

const routeClient = new ApiClient<Route>('/routes');

function useRoutes() {
  return useQuery({
    queryKey:getEntityKey('routes'),
    queryFn: routeClient.getAll,
  });
}

export default useRoutes;
