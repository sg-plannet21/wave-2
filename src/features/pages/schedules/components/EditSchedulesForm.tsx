import Form, { useZodForm } from '@/components/Form/Form';
import TimeRangePickerField from '@/components/Form/RangePickerField/TimeRangePickerField';
import Button from '@/components/Inputs/Button';
import { EntityRoles } from '@/entities/auth';
import useAuth from '@/state/hooks/useAuth';
import react from 'react';
import { Path, SubmitHandler, UseFormProps } from 'react-hook-form';
import { TypeOf, ZodSchema, z } from 'zod';
import { useParams } from 'react-router-dom';
import MessageSelectField from '../../messages/components/MessageSelectField';
import RouteSelectField from '../../routes/components/RouteSelectField';
import useValidateSchedule from '../hooks/useValidateSchedule';
import { CustomFormValues } from '../types/schema';

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
  const { sectionName } = useParams();
  const form = useZodForm<typeof schema>({ defaultValues, schema });
  const { validate, scheduleLookup } = useValidateSchedule();
  const { hasWriteAccess } = useAuth();
  const canWrite = hasWriteAccess([EntityRoles.Schedules]);

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
      className="mx-auto max-w-md gap-1"
    >
      {!isDefault && (
        <TimeRangePickerField
          name="timeRange"
          label="Time Range"
          disabled={!canWrite}
        />
      )}

      {Array.from(Array(5).keys()).map((key) => (
        <MessageSelectField
          key={key}
          label={`Message ${key + 1}`}
          {...form.register(`message_${key + 1}` as Path<TypeOf<T>>)}
          disabled={!canWrite}
        />
      ))}

      <RouteSelectField
        label="Route"
        {...form.register('route' as Path<TypeOf<T>>)}
        disabled={!canWrite}
        exceptionRouteNames={[decodeURIComponent(sectionName as string)]}
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

export default EditSchedulesForm;
