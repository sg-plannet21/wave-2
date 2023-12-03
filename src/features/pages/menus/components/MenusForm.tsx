import Form, { useZodForm } from '@/components/Form/Form';
import { SubmitHandler } from 'react-hook-form';

import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import schema, { FormValues } from '../types/schema';
import MessageSelectField from '../../messages/components/MessageSelectField';

interface Props {
  defaultValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
}

function BusinessUnitForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useZodForm<typeof schema>({ schema, defaultValues });
  return (
    <Form<FormValues> form={form} onSubmit={onSubmit}>
      <InputField label="Name" {...form.register('menu_name')} />
      <MessageSelectField label="Welcome" {...form.register('welcome')} />
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

export default BusinessUnitForm;
