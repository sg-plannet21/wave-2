import { useQuery } from 'react-query';
import ApiClient from '@/services/api-client';
import SelectField, { PassthroughProps } from '@/components/Form/SelectField';
import React from 'react';
import FormInputSkeleton from '@/components/Skeletons/Form-Input/FormInput';
import { getEntityKey } from '@/lib/entity-keys';
import { RouteDestinationType } from '../types';

const destinationTypesClient = new ApiClient<RouteDestinationType>(
  '/routedestinationtypes'
);

const DestinationSelectField = React.forwardRef<
  HTMLSelectElement,
  PassthroughProps
>((props, ref) => {
  const { data } = useQuery({
    queryKey: getEntityKey('route-destination'),
    queryFn: destinationTypesClient.getAll,
    staleTime: 15 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  if (data)
    return (
      <SelectField
        {...props}
        ref={ref}
        options={data.map((routeDestination) => ({
          value: routeDestination.destination_type_id,
          label: routeDestination.destination_type,
        }))}
      />
    );

  return <FormInputSkeleton />;
});

DestinationSelectField.displayName = 'RouteDestinatonSelectField';

export default DestinationSelectField;
