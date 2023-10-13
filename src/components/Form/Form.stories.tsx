import { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';
import Form from './Form';
import InputField from './InputField';
import Button from '../Inputs/Button';
import SelectField from './SelectField';
import TimeRangePickerField from './RangePickerField/TimeRangePickerField';
import DateTimeRangePickerField from './RangePickerField/DateTimeRangePickerField';

function MyForm() {
  const form = useForm<FormValues>();
  return (
    // eslint-disable-next-line no-alert
    <Form form={form} onSubmit={(data) => alert(JSON.stringify(data))}>
      <InputField label="Title" {...form.register('title')} />
      <SelectField
        label="Team"
        {...form.register('type')}
        options={['A', 'B', 'C'].map((type) => ({
          label: type,
          value: type,
        }))}
      />
      <TimeRangePickerField name="timeRange" label="Time Range" />
      <DateTimeRangePickerField name="dateRange" label="Date Range" />
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </Form>
  );
}

const meta = {
  component: MyForm,
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
  dateRange: Date[];
};

export const Basic = {
  render: () => <MyForm />,
} satisfies Story;
