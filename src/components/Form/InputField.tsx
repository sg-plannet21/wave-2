import { ComponentProps, forwardRef } from 'react';
import { FieldError } from './Form';

interface Props extends ComponentProps<'input'> {
  label: string;
}

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, type = 'text', ...props }, ref) => (
    <label>
      <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
        {label}
      </div>
      <input
        className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm dark:shadow-sm-light text-gray-900 dark:bg-gray-700 border-gray-300 placeholder-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500"
        type={type}
        ref={ref}
        {...props}
      />

      <FieldError name={props.name} />
    </label>
  )
);
InputField.displayName = 'InputField';

export default InputField;
