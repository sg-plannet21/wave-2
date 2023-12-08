import SelectField, {
  GroupOption,
  PassthroughProps,
} from '@/components/Form/SelectField';
import React from 'react';
import FormInputSkeleton from '@/components/Skeletons/Form-Input/FormInput';
import useRouteDestinations from '../hooks/useRouteDestinations';
import useRoutes from '../hooks/useRoutes';

interface Props extends PassthroughProps {
  exceptionRouteName?: string;
}

const RouteSelectField = React.forwardRef<HTMLSelectElement, Props>(
  ({ exceptionRouteName, ...props }, ref) => {
    const { data: routes } = useRoutes();
    const { data: destinationTypes } = useRouteDestinations();

    if (routes && destinationTypes) {
      const defaultOption: GroupOption[] = [
        {
          optgroup: '',
          options: [
            {
              label: 'Select Route',
              value: '',
            },
          ],
        },
      ];

      const options: GroupOption[] = destinationTypes
        .map(({ destination_type_id, destination_type }) => ({
          optgroup: destination_type,
          options: Object.values(routes)
            .filter(
              ({ destination_type: routeDestinationType }) =>
                destination_type_id === routeDestinationType
            )
            .filter(
              (route) =>
                !exceptionRouteName || route.route_name !== exceptionRouteName
            )
            .map((route) => ({
              label: route.route_name,
              value: route.route_id,
            })),
        }))
        .filter((grouped) => grouped.options.length);

      return (
        <SelectField
          {...props}
          ref={ref}
          groupedOptions={[...defaultOption, ...options]}
        />
      );
    }

    return <FormInputSkeleton />;
  }
);

RouteSelectField.displayName = 'RouteSelectField';

export default RouteSelectField;
