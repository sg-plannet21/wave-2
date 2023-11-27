import { useMemo } from 'react';
import { get } from 'lodash';
import useRoutes from './useRoutes';
import useRouteDestinationsLookup from './useRouteDestinationsLookup';

export type RouteTableRecord = {
  id: string;
  name: string;
  destination: string;
  destinationType: string;
  isSystemRoute: boolean;
};

function useRoutesTableData() {
  const { data: routes } = useRoutes();
  const destinationsLookup = useRouteDestinationsLookup();

  const data: RouteTableRecord[] = useMemo(() => {
    if (!routes || !destinationsLookup) return [];

    return routes
      .filter((route) => !route.system_created)
      .map((route) => ({
        id: route.route_id,
        name: route.route_name,
        destination: route.destination,
        destinationType: get(
          destinationsLookup[route.destination_type],
          'destination_type'
        ),
        isSystemRoute: route.system_created,
      }));
  }, [routes, destinationsLookup]);

  return { data, isLoading: !routes || !destinationsLookup };
}

export default useRoutesTableData;
