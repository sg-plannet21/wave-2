import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import classNames from 'classnames';
import { FieldWrapperPassThroughProps } from '../FieldWrapper';
import './Calendar.css';
import './Clock.css';
import './DateTimeRangePicker.css';

type DateTimeRangePickerFieldProps = FieldWrapperPassThroughProps &
  React.ComponentProps<typeof DateTimeRangePicker>;

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

// const startDate = '2023-07-07T15:00:00.000Z';
// const dateObjs: Value = [new Date(startDate), new Date()];

const minDate = new Date();
minDate.setHours(0, 0, 0);

function DateTimeRangePickerField({
  label,
  error,
  ...rest
}: DateTimeRangePickerFieldProps) {
  return (
    <div>
      <label
        htmlFor="range-picker"
        className={classNames('block mb-1 text-sm font-medium', {
          'text-red-700 dark:text-red-500': !!error,
        })}
      >
        {label}
      </label>
      <DateTimeRangePicker
        id="range-picker"
        format="dd/MM/y HH:mm"
        disableClock
        clearIcon={null}
        rangeDivider=" to "
        defaultValue={[new Date(), new Date()]}
        minDate={minDate}
        {...rest}
      />
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="mt-1 text-sm font-semibold text-red-600 dark:text-red-500"
        >
          <span className="font-medium">{error.message}</span>
        </div>
      )}
    </div>
  );
}
export default DateTimeRangePickerField;
