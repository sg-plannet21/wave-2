import { zodResolver } from '@hookform/resolvers/zod';
import { ComponentProps } from 'react';
import {
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  UseFormProps,
  useForm,
  useFormContext,
  FormProvider,
} from 'react-hook-form';
import { TypeOf, ZodSchema } from 'zod';

type ZodFormSchema = ZodSchema<Record<string, unknown>>;

interface UseZodFormProps<T extends ZodFormSchema>
  extends UseFormProps<TypeOf<T>> {
  schema: T;
}

export function useZodForm<T extends ZodFormSchema>({
  schema,
  ...rest
}: UseZodFormProps<T>): UseFormReturn<TypeOf<T>> {
  return useForm({
    resolver: zodResolver(schema),
    ...rest,
  });
}

interface FieldErrorProps {
  name?: string;
}

export function FieldError({ name }: FieldErrorProps) {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) return null;

  const error = errors[name];

  if (!error) return null;

  return (
    <div className="mt-1 text-sm font-semibold text-red-600 dark:text-red-500">
      {error.message?.toString()}
    </div>
  );
}

interface Props<T extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...rest
}: Props<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...rest}>
        <fieldset
          className="flex flex-col space-y-4 py-2"
          disabled={form.formState.isSubmitting}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
}

export default Form;
