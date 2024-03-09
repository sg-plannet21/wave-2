/* eslint-disable no-nested-ternary */
import { ReactComponent as WarningIcon } from '@/assets/warning.svg';
import useDisclosure from '@/hooks/useDisclosure';
import React from 'react';
import Button from '@/components/Inputs/Button';
import useEntityDependencies, {
  EntityType,
} from '@/features/dependencies/hooks/useEntityDependencies';
import Dialog from '../Dialog';
import { DialogTitle } from '../Dialog/Dialog';
import DependencyList from './DependencyList';
import Spinner from '../Spinner';

export type DeleteDialogProps = {
  triggerButton: React.ReactElement;
  confirmButton: React.ReactElement;
  title: string;
  body?: string;
  cancelButtonText?: string;
  isDone?: boolean;
  entityId: string;
  entityType: EntityType;
};

function DeleteDialog({
  triggerButton,
  confirmButton,
  title,
  body = '',
  cancelButtonText = 'Cancel',
  isDone = false,
  entityType,
  entityId,
}: DeleteDialogProps) {
  const { isOpen, open, close } = useDisclosure();
  const { data } = useEntityDependencies(entityType, entityId, isOpen);

  const cancelButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (isDone) close();
  }, [isDone, close]);

  const triggerBtn = React.cloneElement(triggerButton, {
    onClick: open,
  });

  const hasDependencies = data && data.related_objects.length > 0;

  return (
    <>
      {triggerBtn}
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="sm:flex sm:items-start ">
          <div className="mx-auto flex-shrink-0 p-2 h-12 w-12 rounded-full bg-red-100 dark:bg-red-700 sm:mx-0 sm:h-10 sm:w-10">
            <WarningIcon
              className="w-full h-full fill-red-600 dark:fill-white"
              aria-hidden="true"
            />
          </div>

          <div className="mt-3 sm:mt-0 sm:ml-4 w-full">
            <DialogTitle
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
            >
              {title}
            </DialogTitle>
            {data ? (
              hasDependencies ? (
                <div className="mt-2">
                  <p className="my-5">
                    The following dependencies will need to be removed before
                    deletion:
                  </p>
                  <div className="ml-2">
                    <DependencyList list={data.related_objects} />
                  </div>
                </div>
              ) : (
                body && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {body}
                    </p>
                  </div>
                )
              )
            ) : (
              <div className="h-60 pr-6 w-full flex items-center justify-center">
                <Spinner size="lg" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex space-x-2 justify-end">
          <Button
            type="button"
            variant="inverse"
            className="w-full inline-flex justify-center rounded-md border focus:ring-1 focus:ring-offset-1 focus:ring-gray-400 focus:dark:ring-gray-300 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={close}
            ref={cancelButtonRef}
          >
            {cancelButtonText}
          </Button>
          {data && !hasDependencies && confirmButton}
        </div>
      </Dialog>
    </>
  );
}

export default DeleteDialog;
