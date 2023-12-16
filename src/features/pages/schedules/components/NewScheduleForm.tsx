import Form, { FieldError, useZodForm } from '@/components/Form/Form';
import { SubmitHandler, useController, useFormContext } from 'react-hook-form';
import Button from '@/components/Inputs/Button';
import TimeRangePickerField from '@/components/Form/RangePickerField/TimeRangePickerField';
import React, { useCallback } from 'react';
import { xor } from 'lodash';
import MessageSelectField from '../../messages/components/MessageSelectField';
import { Weekdays } from '../types';
import RouteSelectField from '../../routes/components/RouteSelectField';
import { NewFormValues, newSchema } from '../types/schema';
import useValidateSchedule from '../hooks/useValidateSchedule';

interface Props {
  onSubmit: SubmitHandler<NewFormValues>;
  isSubmitting: boolean;
}

function WeekdayCheckboxes() {
  const weekdays = Array.from(Array(7).keys()).map((key) => key + 1);

  const { control } = useFormContext();
  const { field } = useController({
    name: 'weekDays',
    control,
    defaultValue: [1],
  });

  const [value, setValue] = React.useState(field.value || []);

  return (
    <label htmlFor="1">
      <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
        Weekdays
      </div>
      <div className="flex flex-wrap gap-6">
        {weekdays.map((day) => (
          <label
            key={day}
            className="flex items-center flex-nowrap gap-2 text-sm font-medium text-gray-900 dark:text-gray-300 "
          >
            <input
              id={day.toString()}
              onChange={(e) => {
                const valueCopy = xor(value, [parseInt(e.target.value, 10)]);

                // send data to react hook form
                field.onChange(valueCopy);

                // update local state
                setValue(valueCopy);
              }}
              disabled={false}
              type="checkbox"
              checked={value.includes(day)}
              value={day}
              className="form-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            {Weekdays[day]}
          </label>
        ))}
      </div>
      <FieldError name="weekDays" />
    </label>
  );
}

function NewSchedulesForm({ onSubmit, isSubmitting }: Props) {
  const form = useZodForm<typeof newSchema>({ schema: newSchema });
  const { validate } = useValidateSchedule();

  const handleSubmit = useCallback(
    (data: NewFormValues) => {
      const [startTime, endTime] = data.timeRange;

      const isValid = data.weekDays.every((day) => {
        const outcome = validate({ day, startTime, endTime });
        if (outcome.success) return true;

        form.setError('weekDays', { message: outcome.message });
        return false;
      });

      if (isValid) {
        onSubmit(data);
      }
    },
    [form, onSubmit, validate]
  );

  return (
    <Form<NewFormValues>
      form={form}
      onSubmit={handleSubmit}
      className="mx-auto max-w-md"
    >
      <WeekdayCheckboxes />

      <TimeRangePickerField name="timeRange" label="Time Range" />

      {Array.from(Array(5).keys()).map((key) => (
        <MessageSelectField
          key={key}
          label={`Message ${key + 1}`}
          {...form.register(`message_${key + 1}` as 'message_5')}
        />
      ))}

      <RouteSelectField label="Route" {...form.register('route')} />

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

export default NewSchedulesForm;
