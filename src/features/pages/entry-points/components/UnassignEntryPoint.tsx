import { ReactComponent as UnassignIcon } from '@/assets/delete.svg';
import ConfirmationDialog from '@/components/Feedback/Confirmation-Dialog';
import Button from '@/components/Inputs/Button';
import useUnassignEntryPoint from '../hooks/useUnassignEntryPoint';

interface Props {
  id: string;
  name: string;
}

function UnassignEntryPoint({ id, name }: Props) {
  const mutation = useUnassignEntryPoint();

  return (
    <ConfirmationDialog
      title="Unassign EntryPoint"
      body={`Unassign ${name}?`}
      icon="danger"
      triggerButton={
        <button
          type="button"
          className="p-1 text-red-600 dark:text-red-400 transition-transform hover:scale-110 outline-none focus:outline-none"
        >
          <UnassignIcon className="w-6 h-6 fill-current" />
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
          Unassign {name}
        </Button>
      }
    />
  );
}

export default UnassignEntryPoint;
