import Form, { useZodForm } from '@/components/Form/Form';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import { EntityRoles } from '@/entities/auth';
import useAuth from '@/state/hooks/useAuth';
import { SubmitHandler } from 'react-hook-form';
import schema, { FormValues } from '../types/schema';

interface Props {
  defaultValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
}

function SectionForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useZodForm<typeof schema>({ schema, defaultValues });
  const { hasWriteAccess } = useAuth();
  const canWrite = hasWriteAccess([EntityRoles.Schedules]);

  return (
    <Form<FormValues>
      form={form}
      onSubmit={onSubmit}
      className="mx-auto max-w-md gap-1"
    >
      <InputField
        label="Name"
        {...form.register('section')}
        disabled={!canWrite}
      />
      <Button
        disabled={!form.formState.isDirty || !canWrite || isSubmitting}
        isLoading={isSubmitting}
        type="submit"
        className="w-full"
      >
        Submit
      </Button>
    </Form>
  );
}

export default SectionForm;
