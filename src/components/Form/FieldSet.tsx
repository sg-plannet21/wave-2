import classNames from 'classnames';

interface Props {
  legend: string;
  className?: string;
  children: React.ReactNode;
}

function FieldSet({ legend, className, children }: Props) {
  return (
    <fieldset
      className={classNames(
        'border border-solid border-gray-300 dark:border-gray-700 rounded p-3',
        className
      )}
    >
      <legend className="text-sm text-gray-400 dark:text-gray-400">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

export default FieldSet;
