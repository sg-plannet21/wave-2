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
        'inline-flex items-center px-5 py-2.5 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none',
        {
          'bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ':
            !disabled,
        },
        { 'bg-slate-500 pointer-events-none': disabled }
      )}
      {...rest}
    >
      <EditIcon className="h-6 w-6 fill-current" />
      {children}
    </Link>
  );
}

export default EditSchedulesLink;
