import { useQuery } from 'react-query';
import ApiClient from '@/services/api-client';
import SelectField, { PassthroughProps } from '@/components/Form/SelectField';
import React from 'react';
import FormInputSkeleton from '@/components/Skeletons/Form-Input/FormInput';
import { Region } from '../types';

const regionFetcher = new ApiClient<Region>('/regions');

const RegionSelectField = React.forwardRef<HTMLSelectElement, PassthroughProps>(
  (props, ref) => {
    const { data } = useQuery({
      queryKey: 'regions',
      queryFn: regionFetcher.getAll,
      staleTime: 5 * 60 * 1000, // 5m,
    });

    if (data)
      return (
        <SelectField
          {...props}
          ref={ref}
          options={data.map((region) => ({
            value: region.id,
            label: region.language_name,
          }))}
        />
      );

    return <FormInputSkeleton />;
  }
);

RegionSelectField.displayName = 'RegionSelectField';

export default RegionSelectField;
