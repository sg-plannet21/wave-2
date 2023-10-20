import classNames from 'classnames';
import { Link as RouterLink, LinkProps } from 'react-router-dom';

function Link({ className, children, ...rest }: LinkProps) {
  return (
    <RouterLink
      className={classNames(
        'text-blue-700 dark:text-blue-500 underline font-medium focus:outline-none hover:text-opacity-80 focus:ring-2 focus:ring-blue-500',
        className
      )}
      {...rest}
    >
      {children}
    </RouterLink>
  );
}

export default Link;
