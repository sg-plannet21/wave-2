import ApiClient from '@/services/api-client';
import { UseQueryOptions, useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { orderBy } from 'lodash';
import { Route } from '../types';

function orderByName(data: Route[]): Route[] {
  return orderBy(data, ['route_name'], 'asc');
}

const routeClient = new ApiClient<Route>('/routes');

function useRoutes(options?: UseQueryOptions<Route[]>) {
  return useQuery({
    queryKey: getEntityKey('routes'),
    queryFn: routeClient.getAll,
    select: orderByName,
    ...options,
  });
}

export default useRoutes;
