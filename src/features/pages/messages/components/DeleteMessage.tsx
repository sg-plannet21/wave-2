import { ReactComponent as DeleteIcon } from '@/assets/delete.svg';
import DeleteDialog from '@/components/Feedback/DeleteDialog/DeleteDialog';
import Button from '@/components/Inputs/Button';
import useDeleteMessage from '../hooks/useDeleteMessage';

interface Props {
    id: string;
    name: string;
}

function DeleteMessage({ id, name }: Props) {
    const mutation = useDeleteMessage();

    return (
        <DeleteDialog
            key={id}
            entityId={id}
            entityType="prompts"
            title="Delete Message"
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

export default DeleteMessage;
