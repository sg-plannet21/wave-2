import { useMemo } from 'react';
import useRoutes from './useRoutes';
import useRouteDestinations from './useRouteDestinations';

export type RouteTableRecord = {
  id: string;
  name: string;
  destination: string;
  destinationType: string;
};

function useRoutesTableData() {
  const { data: routes, isLoading } = useRoutes();
  const { data: routeDestinations } = useRouteDestinations();

  const data: RouteTableRecord[] = useMemo(() => {
    if (!routes || !routeDestinations) return [];

    return routes.map((route) => ({
      id: route.route_id,
      name: route.route_name,
      destination: route.destination,
      destinationType: 'a',
    }));
  }, [routes, routeDestinations]);

  return { data, isLoading };
}

export default useRoutesTableData;
