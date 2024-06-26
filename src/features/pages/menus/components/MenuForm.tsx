import FieldSet from '@/components/Form/FieldSet';
import Form, { useZodForm } from '@/components/Form/Form';
import InputField from '@/components/Form/InputField';
import SelectField from '@/components/Form/SelectField';
import Button from '@/components/Inputs/Button';
import { SelectOption } from '@/components/Inputs/Select';
import { EntityRoles } from '@/entities/auth';
import useAuth from '@/state/hooks/useAuth';
import { SubmitHandler } from 'react-hook-form';
import MessageSelectField from '../../messages/components/MessageSelectField';
import RouteSelectField from '../../routes/components/RouteSelectField';
import schema, { FormValues, menuOptions } from '../types/schema';

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
  const { hasWriteAccess } = useAuth();

  const canWrite = hasWriteAccess([EntityRoles.Menus]);

  return (
    <Form<FormValues> form={form} onSubmit={onSubmit}>
      <FieldSet legend="General">
        <div className="grid grid-cols-1 lg:grid-cols-5 items-start gap-4">
          <div className="lg:col-span-2">
            <InputField
              label="Name"
              {...form.register('menu_name')}
              disabled={!canWrite}
            />
          </div>

          <div className="lg:col-span-2">
            <MessageSelectField
              label="Menu Message"
              {...form.register('menu_message')}
              disabled={!canWrite}
            />
          </div>

          <SelectField
            label="Max Retries"
            options={retryRange}
            defaultValue={2}
            {...form.register('max_retries')}
            disabled={!canWrite}
          />
        </div>
      </FieldSet>

      {menuOptions.map((option) => (
        <FieldSet key={option.prefix} legend={option.label}>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4">
            <MessageSelectField
              label="Message"
              {...form.register(`${option.prefix}_message` as keyof FormValues)}
              disabled={!canWrite}
            />

            <RouteSelectField
              label="Route"
              {...form.register(`${option.prefix}_route` as keyof FormValues)}
              disabled={!canWrite}
            />
          </div>
        </FieldSet>
      ))}

      <Button
        disabled={!form.formState.isDirty || !canWrite || isSubmitting}
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
