import Form, { useZodForm } from '@/components/Form/Form';
import { SubmitHandler } from 'react-hook-form';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import schema, { FormValues } from '../types/schema';

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
