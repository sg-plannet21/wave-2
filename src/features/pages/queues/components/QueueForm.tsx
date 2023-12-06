import Form, { useZodForm } from '@/components/Form/Form';
import { Controller, SubmitHandler } from 'react-hook-form';
import Button from '@/components/Inputs/Button';
import FieldSet from '@/components/Form/FieldSet';
import SelectField from '@/components/Form/SelectField';
import { SelectOption } from '@/components/Inputs/Select';
import Switch from '@/components/Inputs/Switch';
import InputField from '@/components/Form/InputField';
import schema, { FormValues } from '../types/schema';
import MessageSelectField from '../../messages/components/MessageSelectField';
import RouteSelectField from '../../routes/components/RouteSelectField';

interface Props {
  defaultValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
}

const priorityRange: SelectOption[] = Array.from(Array(10).keys())
  .map((key) => key + 1)
  .map((key) => ({
    value: key,
    label: key,
  }));

interface FieldInfo {
  label: string;
  prefix: string;
}

const threeColumnLayouts: Array<FieldInfo> = [
  { label: 'Closed', prefix: 'closed' },
  { label: 'No Agents', prefix: 'no_agents' },
];

const fourColumnLayouts: Array<FieldInfo> = [
  { label: 'Max Queue Calls', prefix: 'max_queue_calls' },
  { label: 'Max Queue Time', prefix: 'max_queue_time' },
];

function QueueForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useZodForm<typeof schema>({ schema, defaultValues });
  return (
    <Form<FormValues> form={form} onSubmit={onSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FieldSet legend="General">
          <div className="grid grid-cols-1 items-start gap-4">
            <SelectField
              label="Priority"
              options={priorityRange}
              defaultValue={1}
              {...form.register('queue_priority')}
            />

            <MessageSelectField
              label="Whisper Announcement"
              {...form.register('whisper_message')}
            />

            <MessageSelectField
              label="Queue Welcome"
              {...form.register('queue_welcome')}
            />

            <MessageSelectField
              label="Queue Music"
              {...form.register('queue_music')}
            />
          </div>
        </FieldSet>

        <FieldSet legend="Comfort Messages">
          <div className="grid grid-cols-1 items-start gap-4">
            {Array.from(Array(5).keys()).map((index) => (
              <MessageSelectField
                key={index}
                label={`Message ${index + 1}`}
                {...form.register(
                  `queue_message_${index + 1}` as 'queue_message_5'
                )}
              />
            ))}
          </div>
        </FieldSet>
      </div>

      {threeColumnLayouts.map((layout) => (
        <FieldSet key={layout.prefix} legend={layout.label}>
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
            <div className="lg:col-span-1">
              <Controller
                control={form.control}
                name={`${layout.prefix}_toggle` as 'closed_toggle'}
                render={({ field }) => (
                  <Switch
                    label="Status"
                    isChecked={field.value}
                    onChange={field.onChange}
                    className="flex w-24 lg:h-full text-sm flex-row-reverse items-end lg:items-start justify-between text-right lg:w-auto lg:flex-col"
                  />
                )}
              />
            </div>

            <div className="lg:col-span-5 items-start">
              <MessageSelectField
                label="Message"
                {...form.register(
                  `${layout.prefix}_message` as 'closed_message'
                )}
              />
            </div>

            <div className="lg:col-span-5 items-start">
              <RouteSelectField
                label="Route"
                {...form.register(`${layout.prefix}_route` as 'closed_route')}
              />
            </div>
          </div>
        </FieldSet>
      ))}

      {fourColumnLayouts.map((layout) => (
        <FieldSet key={layout.prefix} legend={layout.label}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-1">
              <Controller
                control={form.control}
                name={`${layout.prefix}_toggle` as 'max_queue_calls_toggle'}
                render={({ field }) => (
                  <Switch
                    label="Status"
                    isChecked={field.value}
                    onChange={field.onChange}
                    className="flex w-24 lg:h-full text-sm flex-row-reverse items-end lg:items-start justify-between text-right lg:w-auto lg:flex-col"
                  />
                )}
              />
            </div>

            <div className="lg:col-span-3 items-start">
              <InputField
                label={
                  layout.prefix === 'max_queue_time'
                    ? 'Threshold (seconds)'
                    : 'Threshold (calls)'
                }
                {...form.register(
                  `${layout.prefix}_threshold` as 'max_queue_time_threshold'
                )}
              />
            </div>

            <div className="lg:col-span-4 items-start">
              <MessageSelectField
                label="Message"
                {...form.register(
                  `${layout.prefix}_message` as 'max_queue_time_message'
                )}
              />
            </div>

            <div className="lg:col-span-4 items-start">
              <RouteSelectField
                label="Route"
                {...form.register(
                  `${layout.prefix}_route` as 'max_queue_time_route'
                )}
              />
            </div>
          </div>
        </FieldSet>
      ))}

      <FieldSet legend="Callbacks">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-1">
            <Controller
              control={form.control}
              name="callback_toggle"
              render={({ field }) => (
                <Switch
                  label="Status"
                  isChecked={field.value}
                  onChange={field.onChange}
                  className="flex w-24 lg:h-full text-sm flex-row-reverse items-end lg:items-start justify-between text-right lg:w-auto lg:flex-col"
                />
              )}
            />
          </div>

          <div className="lg:col-span-3 items-start">
            <InputField
              label="Threshold (calls)"
              {...form.register('callback_calls_threshold')}
            />
          </div>

          <div className="lg:col-span-4 items-start">
            <InputField
              label="Threshold (time)"
              {...form.register('callback_time_threshold')}
            />
          </div>

          <div className="lg:col-span-4 items-start">
            <RouteSelectField
              label="Route"
              {...form.register('callback_route')}
            />
          </div>
        </div>
      </FieldSet>

      <Button
        disabled={isSubmitting || !form.formState.isDirty}
        isLoading={isSubmitting}
        type="submit"
        className="w-full"
      >
        Submit
      </Button>
    </Form>
  );
}

export default QueueForm;
