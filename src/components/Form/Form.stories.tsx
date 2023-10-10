import { Meta, StoryObj } from '@storybook/react';

import { Controller } from 'react-hook-form';
import Form from './Form';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import SelectField from './SelectField';
import TimeRangePickerField from './RangePickerField/TimeRangePickerField';
import Button from '../Inputs/Button';

const meta = {
  component: Form,
  title: 'Form',
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;
export default meta;

type Story = StoryObj<typeof meta>;

type FormValues = {
  title: string;
  description: string;
  type: string;
  timeRange: string[];
};

function MyForm() {
  return (
    <Form<FormValues>
      // eslint-disable-next-line no-alert
      onSubmit={async (values) => alert(JSON.stringify(values))}
    >
      {({ register, formState, control }) => (
        <>
          <InputField
            label="Title"
            registration={register('title')}
            error={formState.errors.title}
          />
          <TextAreaField
            label="Description"
            registration={register('description')}
            error={formState.errors.description}
          />
          <SelectField
            label="Team"
            error={formState.errors.type}
            registration={register('description')}
            options={[
              { label: 'Team A', value: 'a' },
              { label: 'Team B', value: 'b' },
              { label: 'Team C', value: 'c' },
            ]}
          />
          <Controller
            name="timeRange"
            control={control}
            render={({ field }) => (
              <TimeRangePickerField
                onChange={field.onChange}
                value={field.value as [string, string]}
                error={
                  formState.errors.timeRange &&
                  Array.isArray(formState.errors.timeRange)
                    ? formState.errors.timeRange[0]
                    : formState.errors.timeRange
                }
              />
            )}
          />
          <div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
export const Basic = {
  args: { children: () => <>Form</> },
  render: () => <MyForm />,
} satisfies Story;
