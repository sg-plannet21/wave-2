import Form, { useZodForm } from '@/components/Form/Form';
import { Path, SubmitHandler, UseFormProps } from 'react-hook-form';
import { TypeOf, ZodSchema, z } from 'zod';
import Button from '@/components/Inputs/Button';
import TimeRangePickerField from '@/components/Form/RangePickerField/TimeRangePickerField';
import react from 'react';
import RouteSelectField from '../../routes/components/RouteSelectField';
import MessageSelectField from '../../messages/components/MessageSelectField';
import { CustomFormValues } from '../types/schema';
import useValidateSchedule from '../hooks/useValidateSchedule';

type ZodFormSchema = ZodSchema<Record<string, unknown>>;

interface UseZodFormProps<T extends ZodFormSchema>
  extends UseFormProps<TypeOf<T>> {
  schema: T;
  onSubmit: SubmitHandler<TypeOf<T>>;
  isDefault: boolean;
  idList: Array<string>;
  isSubmitting: boolean;
}

function EditSchedulesForm<T extends ZodFormSchema>({
  schema,
  defaultValues,
  onSubmit,
  isDefault,
  idList,
  isSubmitting,
}: UseZodFormProps<T>) {
  const form = useZodForm<typeof schema>({ defaultValues, schema });
  const { validate, scheduleLookup } = useValidateSchedule();

  const handleSubmit = react.useCallback((data: CustomFormValues) => {
    if (isDefault || !scheduleLookup) {
      onSubmit(data);
      return;
    }
    const [startTime, endTime] = data.timeRange;

    const isValid = idList.every((scheduleId) => {
      const outcome = validate({
        id: scheduleId,
        day: scheduleLookup[scheduleId].week_day,
        startTime,
        endTime,
      });
      if (outcome.success) return true;

      form.setError('timeRange' as Path<TypeOf<T>>, {
        message: outcome.message,
      });
      return false;
    });

    if (isValid) {
      onSubmit(data);
    }
  }, []);

  return (
    <Form<z.infer<typeof schema>>
      form={form}
      onSubmit={(data) =>
        isDefault ? onSubmit(data) : handleSubmit(data as CustomFormValues)
      }
      className="mx-auto max-w-md"
    >
      {!isDefault && (
        <TimeRangePickerField name="timeRange" label="Time Range" />
      )}

      {Array.from(Array(5).keys()).map((key) => (
        <MessageSelectField
          key={key}
          label={`Message ${key + 1}`}
          {...form.register(`message_${key + 1}` as Path<TypeOf<T>>)}
        />
      ))}

      <RouteSelectField
        label="Route"
        {...form.register('route' as Path<TypeOf<T>>)}
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

export default EditSchedulesForm;
