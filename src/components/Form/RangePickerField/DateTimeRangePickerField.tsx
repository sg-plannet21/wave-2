import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import './Calendar.css';
import './Clock.css';
import './DateTimeRangePicker.css';
import { useController, useFormContext } from 'react-hook-form';
import { FieldError } from '../Form';

interface Props extends React.ComponentProps<typeof DateTimeRangePicker> {
  name: string;
  label: string;
}

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

const startDate = new Date();
// set date to next monday
startDate.setDate(startDate.getDate() + ((1 + 7 - startDate.getDay()) % 7));
const endDate = new Date(startDate.getTime());
startDate.setHours(9, 0, 0, 0);
endDate.setHours(17, 0, 0, 0);

const minDate = new Date();
minDate.setHours(0, 0, 0);

function DateTimeRangePickerField({ label, name, ...rest }: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    defaultValue: [startDate, endDate],
  });
  return (
    <label htmlFor="range-picker">
      <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">
        {label}
      </div>
      <DateTimeRangePicker
        id="range-picker"
        format="dd/MM/y HH:mm"
        disableClock
        clearIcon={null}
        rangeDivider=" to "
        minDate={minDate}
        {...rest}
        {...field}
      />
      <FieldError name={name} />
    </label>
  );
}
export default DateTimeRangePickerField;
