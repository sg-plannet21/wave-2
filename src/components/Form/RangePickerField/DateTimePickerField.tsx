import DateTimePicker from 'react-datetime-picker';
import './Calendar.css';
import './Clock.css';
import './DateTimePicker.css';
import { useController, useFormContext } from 'react-hook-form';
import { FieldError } from '../Form';

interface Props extends React.ComponentProps<typeof DateTimePicker> {
  name: string;
  label: string;
}

type ValuePiece = Date | null;

const defaultDate = new Date();

export type Value = ValuePiece | [ValuePiece, ValuePiece];

function DateTimePickerField({ label, name, ...rest }: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    defaultValue: defaultDate,
  });
  return (
    <label htmlFor="date-picker">
      <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
        {label}
      </div>
      <DateTimePicker
        id="date-picker"
        format="dd/MM/y HH:mm"
        disableClock
        clearIcon={null}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        disabled={field.disabled}
        name={field.name}
        {...rest}
      />
      <FieldError name={name} />
    </label>
  );
}
export default DateTimePickerField;
