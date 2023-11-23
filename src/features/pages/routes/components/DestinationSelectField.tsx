import { useQuery } from 'react-query';
import ApiClient from '@/services/api-client';
import SelectField, { PassthroughProps } from '@/components/Form/SelectField';
import React, { useMemo } from 'react';
import FormInputSkeleton from '@/components/Skeletons/Form-Input/FormInput';
import { getEntityKey } from '@/lib/entity-keys';
import { chain } from 'lodash';
import { RouteDestinationType } from '../types';

const destinationTypesClient = new ApiClient<RouteDestinationType>(
  '/routedestinationtypes'
);

const DestinationSelectField = React.forwardRef<
  HTMLSelectElement,
  PassthroughProps
>((props, ref) => {
  const { data } = useQuery({
    queryKey: getEntityKey('route-destinations'),
    queryFn: destinationTypesClient.getAll,
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const options = useMemo(
    () =>
      chain(data ?? [])
        .map((routeDestination) => ({
          value: routeDestination.destination_type_id,
          label: routeDestination.destination_type,
        }))
        .orderBy(['label'])
        .value(),
    [data]
  );

  if (options.length)
    return <SelectField {...props} ref={ref} options={options} />;

  return <FormInputSkeleton />;
});

DestinationSelectField.displayName = 'RouteDestinatonSelectField';

export default DestinationSelectField;
