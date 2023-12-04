import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { orderBy } from 'lodash';
import { Route } from '../types';

function orderByName(data: Route[]): Route[] {
  return orderBy(data, ['route_name'], 'asc');
}

const routeClient = new ApiClient<Route>('/routes');

function useRoutes() {
  return useQuery({
    queryKey: getEntityKey('routes'),
    queryFn: routeClient.getAll,
    select: orderByName,
  });
}

export default useRoutes;
