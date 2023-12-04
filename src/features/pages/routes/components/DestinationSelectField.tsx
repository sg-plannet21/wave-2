import SelectField, { PassthroughProps } from '@/components/Form/SelectField';
import React from 'react';
import FormInputSkeleton from '@/components/Skeletons/Form-Input/FormInput';
import useRouteDestinations from '../hooks/useRouteDestinations';

const DestinationSelectField = React.forwardRef<
  HTMLSelectElement,
  PassthroughProps
>((props, ref) => {
  const { data } = useRouteDestinations();

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
