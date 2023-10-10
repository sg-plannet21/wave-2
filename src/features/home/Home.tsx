import Form from '@/components/Form/Form';
import InputField from '@/components/Form/InputField';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DateTimeRangePickerField from '@/components/Form/RangePickerField/DateTimeRangePickerField';
import TimeRangePickerField from '@/components/Form/RangePickerField/TimeRangePickerField';
import Button from '@/components/Inputs/Button';
import useNotifications from '@/state/hooks/useNotifications';
import { Controller } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(20, 'Name must be 20 characters or less')
    .trim(),
  timeRange: z
    .array(z.string(), {
      required_error: 'Time Range is required',
      invalid_type_error: 'Time Range is required',
    })
    .refine((val) => val[0] < val[1], {
      message: 'Start time must come before end time',
    }),
});
type FormValues = z.infer<typeof schema>;

function Home() {
  const { addNotification } = useNotifications();
  return (
    <Form<FormValues, typeof schema>
      className="max-w-sm mx-auto py-5"
      schema={schema}
      onSubmit={(values) => {
        // eslint-disable-next-line no-console
        console.log(values);
        addNotification({
          title: 'Success',
          type: 'success',
          message: values.name,
          duration: 5000,
        });
      }}
      options={{
        defaultValues: { name: '', timeRange: ['09:00', '17:00'] },
      }}
    >
      {({ register, formState, control }) => (
        <>
          <InputField
            registration={register('name')}
            label="Name"
            error={formState.errors.name}
          />

          {/*
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <DateTimeRangePickerField
                label="Date Range"
                error={formState.errors.dateRange as FieldError}
                inputRef={field.ref}
                onChange={field.onChange}
                value={field.value as [Date, Date]}
                onBlur={field.onBlur}
              />
            )}
          />
                    */}
          <Controller
            name="timeRange"
            control={control}
            render={({ field }) => (
              <TimeRangePickerField
                label="Time Range"
                error={
                  formState.errors.timeRange &&
                  Array.isArray(formState.errors.timeRange)
                    ? formState.errors.timeRange[0]
                    : formState.errors.timeRange
                }
                onChange={field.onChange}
                value={field.value as [string, string]}
                onBlur={field.onBlur}
              />
            )}
          />

          <Button
            disabled={!formState.isDirty}
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
        </>
      )}
    </Form>
  );
}

export default Home;
