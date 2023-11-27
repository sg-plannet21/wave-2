import Form, { useZodForm } from '@/components/Form/Form';
import { SubmitHandler } from 'react-hook-form';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import schema, { FormValues } from '../types/schema';
import RegionSelectField from '../../business-units/components/RegionSelectField';
import SectionSelectField from '../../sections/components/SectionSelectField';

interface Props {
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
  defaultValues?: FormValues;
}

function EntryPointForm({ onSubmit, isSubmitting, defaultValues }: Props) {
  const form = useZodForm<typeof schema>({ schema, defaultValues });

  return (
    <Form<FormValues> form={form} onSubmit={onSubmit}>
      <InputField label="Name" {...form.register('entry_point')} />
      <RegionSelectField label="Region" {...form.register('region')} />
      <SectionSelectField label="Section" {...form.register('section')} />
      <Button
        disabled={isSubmitting}
        isLoading={isSubmitting}
        type="submit"
        className="w-full"
      >
        Submit
      </Button>
    </Form>
  );
}

export default EntryPointForm;
