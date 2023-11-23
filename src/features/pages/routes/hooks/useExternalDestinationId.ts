import useRouteDestinations from './useRouteDestinations';

function useExternalDestinationId() {
  const { data: routeDestinations } = useRouteDestinations();

  if (!routeDestinations) return undefined;

  const index = routeDestinations.findIndex((destination) =>
    /external/i.test(destination.destination_type)
  );

  return index === -1
    ? undefined
    : routeDestinations[index].destination_type_id;
}

export default useExternalDestinationId;
