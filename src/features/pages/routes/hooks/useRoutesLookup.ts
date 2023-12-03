import entityLookup from '@/lib/entity-lookup';
import useRoutes from './useRoutes';
import { Route } from '../types';

function useRoutesLookup() {
  const { data } = useRoutes();

  return data && entityLookup<Route>(data, 'route_id');
}

export default useRoutesLookup;
