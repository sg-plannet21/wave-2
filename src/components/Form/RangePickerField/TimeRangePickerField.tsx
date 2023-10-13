import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import './Clock.css';
import './TimeRangePicker.css';
import { useController, useFormContext } from 'react-hook-form';
import { FieldError } from '../Form';

interface Props extends React.ComponentProps<typeof TimeRangePicker> {
  name: string;
  label: string;
}

type ValuePiece = Date | string | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

function TimeRangePickerField({ label, name, ...rest }: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    defaultValue: ['9:00', '17:00'],
  });
  return (
    <label htmlFor="range-picker">
      <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
        {label}
      </div>
      <TimeRangePicker
        id="range-picker"
        format="HH:mm"
        disableClock
        clearIcon={null}
        rangeDivider=" to "
        {...rest}
        {...field}
      />
      <FieldError name={name} />
    </label>
  );
}
export default TimeRangePickerField;
