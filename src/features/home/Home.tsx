import Button from '@/components/Elements/Button/Button';
import Form from '@/components/Form/Form';
import InputField from '@/components/Form/InputField';
import DateTimeRangePickerField from '@/components/Form/RangePickerField/DateTimeRangePickerField';
import useNotifications from '@/state/hooks/useNotifications';
import { Controller, FieldError } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(20, 'Name must be 20 characters or less')
    .trim(),
  dateRange: z.date().array(),
});
type FormValues = z.infer<typeof schema>;

function Home() {
  const { addNotification } = useNotifications();
  return (
    <Form<FormValues, typeof schema>
      className="max-w-sm mx-auto py-5"
      schema={schema}
      onSubmit={(values) =>
        addNotification({
          title: 'Success',
          type: 'success',
          message: values.name,
        })
      }
      options={{
        defaultValues: { name: '', dateRange: [new Date(), new Date()] },
      }}
    >
      {({ register, formState, control }) => (
        <>
          <InputField
            registration={register('name')}
            label="Name"
            error={formState.errors.name}
          />
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
