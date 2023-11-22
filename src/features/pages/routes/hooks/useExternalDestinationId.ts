import useRouteDestinations from './useRouteDestinations';

function useExternalDestinationId(): string | undefined {
  const { data: routeDestinations } = useRouteDestinations();

  const index = routeDestinations?.findIndex((destination) =>
    /external/i.test(destination.destination_type)
  );

  if (!index) return undefined;

  return routeDestinations && routeDestinations[index].destination_type_id;
}

export default useExternalDestinationId;
