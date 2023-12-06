import Form, { useZodForm } from '@/components/Form/Form';
import { SubmitHandler } from 'react-hook-form';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import SelectField from '@/components/Form/SelectField';
import { SelectOption } from '@/components/Inputs/Select';
import FieldSet from '@/components/Form/FieldSet';
import schema, { FormValues, menuOptions } from '../types/schema';
import MessageSelectField from '../../messages/components/MessageSelectField';
import RouteSelectField from '../../routes/components/RouteSelectField';

interface Props {
  defaultValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
  isSubmitting: boolean;
}

const retryRange: SelectOption[] = Array.from(Array(10).keys()).map((key) => ({
  value: key,
  label: key,
}));

function MenuForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useZodForm<typeof schema>({ schema, defaultValues });
  return (
    <Form<FormValues> form={form} onSubmit={onSubmit}>
      <FieldSet legend="General">
        <div className="grid grid-cols-1 lg:grid-cols-5 items-start gap-4">
          <div className="lg:col-span-2">
            <InputField label="Name" {...form.register('menu_name')} />
          </div>

          <div className="lg:col-span-2">
            <MessageSelectField
              label="Menu Message"
              {...form.register('menu_message')}
            />
          </div>

          <SelectField
            label="Max Retries"
            options={retryRange}
            defaultValue={2}
            {...form.register('max_retries')}
          />
        </div>
      </FieldSet>

      {menuOptions.map((option) => (
        <FieldSet key={option.prefix} legend={option.label}>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4">
            <MessageSelectField
              label="Message"
              {...form.register(`${option.prefix}_message` as keyof FormValues)}
            />

            <RouteSelectField
              label="Route"
              {...form.register(`${option.prefix}_route` as keyof FormValues)}
            />
          </div>
        </FieldSet>
      ))}

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

export default MenuForm;
