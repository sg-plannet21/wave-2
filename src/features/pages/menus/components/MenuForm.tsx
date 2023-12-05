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

const fieldSetClasses =
  'border border-solid border-gray-300 dark:border-gray-700 rounded p-3';

const legendClasses = 'text-sm text-gray-400 dark:text-gray-400';

function BusinessUnitForm({ defaultValues, onSubmit, isSubmitting }: Props) {
  const form = useZodForm<typeof schema>({ schema, defaultValues });
  return (
    <Form<FormValues> form={form} onSubmit={onSubmit}>
      <fieldset className={fieldSetClasses}>
        <legend className={legendClasses}>General</legend>

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
      </fieldset>

      {menuOptions.map((option) => (
        <fieldset key={option.prefix} className={fieldSetClasses}>
          <legend className={legendClasses}>{option.label}</legend>
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
        </fieldset>
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
