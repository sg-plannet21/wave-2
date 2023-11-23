import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { Route } from '../types';

const routeClient = new ApiClient<Route>('/routes');

function useRoute(id: string) {
  return useQuery({
    queryKey: ['route', id],
    queryFn: () => routeClient.get(id),
    enabled: !!id,
  });
}

export default useRoute;
