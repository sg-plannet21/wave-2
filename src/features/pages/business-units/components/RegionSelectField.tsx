import SelectField, { PassthroughProps } from '@/components/Form/SelectField';
import React from 'react';
import FormInputSkeleton from '@/components/Skeletons/Form-Input/FormInput';
import useRegions from '../hooks/useRegions';

const RegionSelectField = React.forwardRef<HTMLSelectElement, PassthroughProps>(
  (props, ref) => {
    const { data } = useRegions();

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
