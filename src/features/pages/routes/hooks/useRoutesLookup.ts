import entityLookup from '@/lib/entity-lookup';
import { UseQueryOptions } from 'react-query';
import useRoutes from './useRoutes';
import { Route } from '../types';

function useRoutesLookup(options?: UseQueryOptions<Route[]>) {
  const { data } = useRoutes(options);

  return data && entityLookup<Route>(data, 'route_id');
}

export default useRoutesLookup;
