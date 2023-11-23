import entityLookup from '@/lib/entity-lookup';
import useRouteDestinations from './useRouteDestinations';

function useRouteDestinationsLookup() {
  const { data } = useRouteDestinations();

  return data && entityLookup(data, 'destination_type_id');
}

export default useRouteDestinationsLookup;
