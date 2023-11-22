import Form, { useZodForm } from '@/components/Form/Form';
import { SubmitHandler } from 'react-hook-form';

import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import { ZodSchema } from 'zod';
import { FormValues } from '../types/schema';
import DestinationSelectField from './DestinationSelectField';

interface Props {
  schema: ZodSchema<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
}

// TODO: default values

function RouteForm({ schema, onSubmit, isSubmitting }: Props) {
  const form = useZodForm<typeof schema>({ schema });

  return (
    <Form<FormValues> form={form} onSubmit={onSubmit}>
      <InputField label="Name" {...form.register('route_name')} />
      <InputField label="Destination" {...form.register('destination')} />
      <DestinationSelectField
        label="Destination Type"
        {...form.register('destination_type')}
      />
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

export default RouteForm;
