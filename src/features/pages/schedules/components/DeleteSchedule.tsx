import { ReactComponent as DeleteIcon } from '@/assets/delete.svg';
import ConfirmationDialog from '@/components/Feedback/Confirmation-Dialog';
import Button from '@/components/Inputs/Button';
import useDeleteSchedule from '../hooks/useDeleteSchedule';

interface Props {
  id: string;
  name: string;
}

function DeleteSchedule({ id, name }: Props) {
  const mutation = useDeleteSchedule();

  return (
    <ConfirmationDialog
      key={id}
      title="Delete Schedule"
      body={`Delete ${name}?`}
      icon="danger"
      triggerButton={
        <button
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

export default DeleteSchedule;
