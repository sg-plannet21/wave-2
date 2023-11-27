import SelectField, { PassthroughProps } from '@/components/Form/SelectField';
import React, { useMemo } from 'react';
import FormInputSkeleton from '@/components/Skeletons/Form-Input/FormInput';
import { orderBy } from 'lodash';
import useSections from '../hooks/useSections';

const SectionSelectField = React.forwardRef<
  HTMLSelectElement,
  PassthroughProps
>((props, ref) => {
  const { data } = useSections();

  const options = useMemo(
    () =>
      orderBy(data, ['section'], 'asc').map((section) => ({
        value: section.section_id,
        label: section.section,
      })),
    [data]
  );

  if (data)
    return (
      <SelectField
        {...props}
        ref={ref}
        options={[{ value: '', label: 'Select Section' }, ...options]}
      />
    );

  return <FormInputSkeleton />;
});

SectionSelectField.displayName = 'SectionSelectField';

export default SectionSelectField;
