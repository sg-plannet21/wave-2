import { ReactComponent as EditIcon } from '@/assets/edit.svg';
import classNames from 'classnames';
import { Link, LinkProps } from 'react-router-dom';

function EditSchedulesLink({
  to,
  children,
  disabled,
  ...rest
}: LinkProps & { disabled: boolean }) {
  return (
    <Link
      to={to}
      className={classNames(
        'inline-flex justify-center items-center gap-1 px-5 py-2.5 text-sm text-white font-medium text-center rounded-lg focus:outline-none',
        {
          'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-900 focus:ring-4':
            !disabled,
        },
        { 'bg-gray-300 dark:bg-gray-400 pointer-events-none': disabled }
      )}
      {...rest}
    >
      <EditIcon className="h-6 w-6 fill-current" />
      {children}
    </Link>
  );
}

export default EditSchedulesLink;
