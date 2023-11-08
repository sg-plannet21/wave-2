import Form, { useZodForm } from '@/components/Form/Form';
import { SubmitHandler } from 'react-hook-form';

import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import schema, { FormValues } from '../types/schema';
import RegionSelectField from './RegionSelectField';

interface Props {
  defaultValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
}

function BusinessUnitForm({
  defaultValues = { business_unit: '', default_region: 52 },
  onSubmit,
}: Props) {
  const form = useZodForm<typeof schema>({ schema, defaultValues });
  return (
    <Form<FormValues> form={form} onSubmit={onSubmit}>
      <InputField label="Name" {...form.register('business_unit')} />
      <RegionSelectField label="Region" {...form.register('default_region')} />
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </Form>
  );
}

export default BusinessUnitForm;
