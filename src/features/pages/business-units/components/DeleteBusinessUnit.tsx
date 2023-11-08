import { ReactComponent as DeleteIcon } from '@/assets/delete.svg';
import ConfirmationDialog from '@/components/Feedback/Confirmation-Dialog';
import Button from '@/components/Inputs/Button';

interface Props {
  id: string;
  name: string;
}

function DeleteBusinessUnit({ id, name }: Props) {
  return (
    <ConfirmationDialog
      title={`Delete ${name}`}
      icon="danger"
      triggerButton={
        <button
          type="button"
          className="p-1 text-red-600 dark:text-red-400 transition-transform hover:scale-110 outline-none focus:outline-none"
        >
          <DeleteIcon className="w-6 h-6 fill-current" />
        </button>
      }
      confirmButton={<Button variant="danger">Delete {id}</Button>}
    />
  );
}

export default DeleteBusinessUnit;
