import SelectField, { PassthroughProps } from '@/components/Form/SelectField';
import React, { useMemo } from 'react';
import FormInputSkeleton from '@/components/Skeletons/Form-Input/FormInput';
import { orderBy } from 'lodash';
import useRegions from '../hooks/useRegions';

const RegionSelectField = React.forwardRef<HTMLSelectElement, PassthroughProps>(
  (props, ref) => {
    const { data } = useRegions();

    const options = useMemo(
      () =>
        orderBy(data, ['language_name'], 'asc').map((region) => ({
          value: region.id,
          label: region.language_name,
        })),
      [data]
    );

    if (options) return <SelectField {...props} ref={ref} options={options} />;

    return <FormInputSkeleton />;
  }
);

RegionSelectField.displayName = 'RegionSelectField';

export default RegionSelectField;
