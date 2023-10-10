import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form';
import { ZodType, ZodTypeDef } from 'zod';

type FormProps<TFormValues extends FieldValues, Schema> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  schema?: Schema;
};
function Form<
  TFormValues extends FieldValues = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>({
  className,
  onSubmit,
  children,
  options,
  schema,
}: FormProps<TFormValues, Schema>) {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });
  return (
    <form
      onSubmit={methods.handleSubmit(onSubmit)}
      className={classNames('space-y-6', className)}
    >
      {children(methods)}
    </form>
  );
}

export default Form;
