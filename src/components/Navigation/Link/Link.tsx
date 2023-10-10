import classNames from 'classnames';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

function Link({ className, children, ...rest }: LinkProps) {
  return (
    <RouterLink
      className={classNames(
        'text-gray-900 dark:text-gray-100 underline font-medium focus:outline-none hover:text-opacity-80 focus:ring-2 focus:ring-gray-500',
        className
      )}
      {...rest}
    >
      {children}
    </RouterLink>
  );
}

export default Link;
