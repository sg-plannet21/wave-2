import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import classNames from 'classnames';
import { FieldWrapperPassThroughProps } from '../FieldWrapper';
import './Clock.css';
import './TimeRangePicker.css';

type TimeRangePickerFieldProps = FieldWrapperPassThroughProps &
  React.ComponentProps<typeof TimeRangePicker>;

type ValuePiece = Date | string | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

// const startDate = '2023-07-07T15:00:00.000Z';
// const dateObjs: Value = [new Date(startDate), new Date()];

const minDate = new Date();
minDate.setHours(0, 0, 0);

function TimeRangePickerField({
  label,
  error,
  ...rest
}: TimeRangePickerFieldProps) {
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
      <TimeRangePicker
        id="range-picker"
        format="HH:mm"
        disableClock
        clearIcon={null}
        rangeDivider=" to "
        value={["9:00", "17:00"]}
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
export default TimeRangePickerField;
