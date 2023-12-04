import Form, { useZodForm } from '@/components/Form/Form';
import { SubmitHandler } from 'react-hook-form';
import InputField from '@/components/Form/InputField';
import Button from '@/components/Inputs/Button';
import SelectField from '@/components/Form/SelectField';
import { SelectOption } from '@/components/Inputs/Select';
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

function BusinessUnitForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useZodForm<typeof schema>({ schema, defaultValues });
  return (
    <Form<FormValues> form={form} onSubmit={onSubmit}>
      <InputField label="Name" {...form.register('menu_name')} />

      <MessageSelectField
        label="Menu Message"
        {...form.register('menu_message')}
      />

      <SelectField
        label="Max Retries"
        options={retryRange}
        {...form.register('max_retries')}
      />

      {menuOptions.map((option) => (
        <div key={option.prefix}>
          <MessageSelectField
            label={`${option.label} Message`}
            {...form.register(`${option.prefix}_message` as keyof FormValues)}
          />

          <RouteSelectField
            label={`${option.label} Route`}
            {...form.register(`${option.prefix}_route` as keyof FormValues)}
          />
        </div>
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

export default BusinessUnitForm;
