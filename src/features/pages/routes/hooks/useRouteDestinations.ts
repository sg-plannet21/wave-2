import { getEntityKey } from '@/lib/entity-keys';
import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { orderBy } from 'lodash';
import { RouteDestinationType } from '../types';

function orderByName(data: RouteDestinationType[]): RouteDestinationType[] {
  return orderBy(data, ['destination_type'], 'asc');
}

const destinationTypesClient = new ApiClient<RouteDestinationType>(
  '/routedestinationtypes'
);

function useRouteDestinations() {
  return useQuery({
    queryKey: getEntityKey('route-destinations'),
    queryFn: destinationTypesClient.getAll,
    select: orderByName,
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
}

export default useRouteDestinations;
