import { ReactComponent as PlusIcon } from '@/assets/plus.svg';
import { Link, LinkProps } from 'react-router-dom';

function NewEntityLink({ to, children, ...rest }: LinkProps) {
  return (
    <Link
      to={to}
      className="inline-flex justify-center items-center gap-1 px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      {...rest}
    >
      <PlusIcon className="h-6 w-6 fill-current" />
      {children}
    </Link>
  );
}

export default NewEntityLink;
