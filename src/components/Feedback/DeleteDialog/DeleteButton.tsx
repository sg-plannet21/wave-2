import { ReactComponent as DeleteIcon } from '@/assets/delete.svg';
import { forwardRef } from 'react';

const DeleteButton = forwardRef<HTMLButtonElement, unknown>((_, ref) => (
  <button
    ref={ref}
    aria-label="Delete"
    type="button"
    className="p-1 text-red-600 dark:text-red-400 transition-transform hover:scale-110 outline-none focus:outline-none"
  >
    <DeleteIcon className="w-6 h-6 fill-current" />
  </button>
));

DeleteButton.displayName = 'DeleteButton';

export default DeleteButton;
