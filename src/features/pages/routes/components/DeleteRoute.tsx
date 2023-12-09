import { ReactComponent as DeleteIcon } from '@/assets/delete.svg';
import ConfirmationDialog from '@/components/Feedback/Confirmation-Dialog';
import Button from '@/components/Inputs/Button';
import useDeleteRoute from '../hooks/useDeleteRoute';

interface Props {
  id: string;
  name: string;
}

function DeleteRoute({ id, name }: Props) {
  const mutation = useDeleteRoute();

  return (
    <ConfirmationDialog
      key={id}
      title="Delete Route"
      body={`Delete ${name}?`}
      icon="danger"
      isDone={mutation.isSuccess}
      triggerButton={
        <button
          aria-label="Delete"
          type="button"
          className="p-1 text-red-600 dark:text-red-400 transition-transform hover:scale-110 outline-none focus:outline-none"
        >
          <DeleteIcon className="w-6 h-6 fill-current" />
        </button>
      }
      confirmButton={
        <Button
          isLoading={mutation.isLoading}
          disabled={mutation.isLoading}
          onClick={async () => {
            await mutation.mutateAsync(id);
          }}
          variant="danger"
        >
          Delete {name}
        </Button>
      }
    />
  );
}

export default DeleteRoute;
