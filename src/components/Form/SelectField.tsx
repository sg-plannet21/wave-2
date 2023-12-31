import * as React from 'react';
import { FieldError } from './Form';

export type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

export type GroupOption = { optgroup?: string; options: Option[] };

type OptionType =
  | { options: Option[]; groupedOptions?: never }
  | { options?: never; groupedOptions: GroupOption[] };

export type PassthroughProps = Omit<
  React.ComponentProps<'select'>,
  'options'
> & { label: string };

type Props = PassthroughProps & OptionType;

function renderOption({ label, value }: Option) {
  return (
    <option key={value.toString()} value={value}>
      {label}
    </option>
  );
}

const SelectField = React.forwardRef<HTMLSelectElement, Props>(
  ({ label, options, groupedOptions, ...props }, ref) => (
    <label>
      <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
        {label}
      </div>
      <select
        className="form-select mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md border text-gray-900 focus:outline-none sm:text-sm dark:text-white dark:bg-gray-700 bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ref={ref}
        {...props}
      >
        {options
          ? options.map((option) => renderOption(option))
          : groupedOptions.map((groupedOption) =>
              groupedOption.optgroup ? (
                <optgroup
                  key={groupedOption.optgroup}
                  label={groupedOption.optgroup}
                >
                  {groupedOption.options.map((option) => renderOption(option))}
                </optgroup>
              ) : (
                groupedOption.options.map((option) => renderOption(option))
              )
            )}
      </select>
      <FieldError name={props.name} />
    </label>
  )
);
SelectField.displayName = 'SelectField';

export default SelectField;
