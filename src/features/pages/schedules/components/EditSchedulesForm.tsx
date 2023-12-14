import Form, { useZodForm } from '@/components/Form/Form';
import { Path, SubmitHandler, UseFormProps } from 'react-hook-form';
import { TypeOf, ZodSchema, z } from 'zod';
import Button from '@/components/Inputs/Button';
import TimeRangePickerField from '@/components/Form/RangePickerField/TimeRangePickerField';
import RouteSelectField from '../../routes/components/RouteSelectField';
import MessageSelectField from '../../messages/components/MessageSelectField';

type ZodFormSchema = ZodSchema<Record<string, unknown>>;

interface UseZodFormProps<T extends ZodFormSchema>
  extends UseFormProps<TypeOf<T>> {
  schema: T;
  onSubmit: SubmitHandler<TypeOf<T>>;
  isDefault: boolean;
  isSubmitting: boolean;
}

function EditSchedulesForm<T extends ZodFormSchema>({
  schema,
  defaultValues,
  onSubmit,
  isDefault,
  isSubmitting,
}: UseZodFormProps<T>) {
  const form = useZodForm<typeof schema>({ defaultValues, schema });
  return (
    <Form<z.infer<typeof schema>>
      form={form}
      onSubmit={onSubmit}
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

      <RouteSelectField label="Route" name="route" />

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
