import Form, { useZodForm } from '@/components/Form/Form';
import { SubmitHandler } from 'react-hook-form';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import useAuth from '@/state/hooks/useAuth';
import { EntityRoles } from '@/entities/auth';
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
  const { hasWriteAccess } = useAuth();

  const canWrite = hasWriteAccess([EntityRoles.EntryPoints]);

  return (
    <Form<FormValues>
      form={form}
      onSubmit={onSubmit}
      className="mx-auto max-w-md gap-1"
    >
      <InputField
        label="Name"
        {...form.register('entry_point')}
        disabled={!canWrite}
      />
      <RegionSelectField
        label="Region"
        {...form.register('region')}
        disabled={!canWrite}
      />
      <SectionSelectField
        label="Section"
        {...form.register('section')}
        disabled={!canWrite}
      />
      <Button
        disabled={!canWrite || isSubmitting}
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
