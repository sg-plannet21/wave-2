import { ReactComponent as DeleteIcon } from '@/assets/delete.svg';
import Button from '@/components/Inputs/Button';
import DeleteDialog from '@/components/Feedback/DeleteDialog/DeleteDialog';
import useDeleteBusinessUnit from '../hooks/useDeleteBusinessUnit';

interface Props {
  id: string;
  name: string;
}

function DeleteBusinessUnit({ id, name }: Props) {
  const mutation = useDeleteBusinessUnit();

  return (
    <DeleteDialog
      key={id}
      entityId={id}
      entityType="businessunits"
      title="Delete Business Unit"
      body={`Delete ${name}?`}
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

export default DeleteBusinessUnit;
