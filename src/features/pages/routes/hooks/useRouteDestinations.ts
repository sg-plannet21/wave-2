import { getEntityKey } from '@/lib/entity-keys';
import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { RouteDestinationType } from '../types';

const destinationTypesClient = new ApiClient<RouteDestinationType>(
  '/routedestinationtypes'
);

function useRouteDestinations() {
  return useQuery({
    queryKey: getEntityKey('route-destinations'),
    queryFn: destinationTypesClient.getAll,
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });
}

export default useRouteDestinations;
