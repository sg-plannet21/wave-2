import Form, { useZodForm } from '@/components/Form/Form';
import { SubmitHandler } from 'react-hook-form';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import DateTimeRangePickerField from '@/components/Form/RangePickerField/DateTimeRangePickerField';
import { useCallback } from 'react';
import { EntityRoles } from '@/entities/auth';
import useAuth from '@/state/hooks/useAuth';
import schema, { FormValues } from '../types/schema';
import MessageSelectField from '../../messages/components/MessageSelectField';
import RouteSelectField from '../../routes/components/RouteSelectField';
import useValidateException from '../hooks/useValidateException';

interface Props {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
}

function ExceptionForm({ id, defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useZodForm<typeof schema>({ schema, defaultValues });
  const { validate, exceptions } = useValidateException();
  const { hasWriteAccess } = useAuth();
  const canWrite = hasWriteAccess([EntityRoles.Schedules]);

  const handleSubmit = useCallback(
    (values: FormValues) => {
      const [startDate, endDate] = values.dateRange;

      const outcome = validate(
        exceptions.filter((ex) => !id || ex.schedule_exception_id !== id),
        startDate.toJSON(),
        endDate.toJSON()
      );

      if (!outcome.success) {
        form.setError('dateRange', { message: outcome.message });
        return;
      }

      onSubmit(values);
    },
    [exceptions, form, id, onSubmit, validate]
  );

  return (
    <Form<FormValues>
      form={form}
      onSubmit={handleSubmit}
      className="mx-auto max-w-md gap-1"
    >
      <InputField
        label="Name"
        {...form.register('description')}
        disabled={!canWrite}
      />

      <DateTimeRangePickerField
        label="Date Range"
        name="dateRange"
        disabled={!canWrite}
      />

      {Array.from(Array(5).keys()).map((key) => (
        <MessageSelectField
          key={key}
          label={`Message ${key + 1}`}
          {...form.register(`message_${key + 1}` as 'message_5')}
          disabled={!canWrite}
        />
      ))}

      <RouteSelectField
        label="Route"
        {...form.register('route')}
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

export default ExceptionForm;
