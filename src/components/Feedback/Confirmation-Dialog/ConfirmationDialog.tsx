import { ReactComponent as WarningIcon } from '@/assets/warning.svg';
import { ReactComponent as InfoCircleIcon } from '@/assets/info-circle.svg';
import useDisclosure from '@/hooks/useDisclosure';
import React from 'react';
import Button from '@/components/Inputs/Button';
import Dialog from '../Dialog';
import { DialogTitle } from '../Dialog/Dialog';

export type ConfirmationDialogProps = {
  triggerButton: React.ReactElement;
  confirmButton: React.ReactElement;
  title: string;
  body?: string;
  cancelButtonText?: string;
  icon?: 'danger' | 'info';
  isDone?: boolean;
};

function ConfirmationDialog({
  triggerButton,
  confirmButton,
  title,
  body = '',
  cancelButtonText = 'Cancel',
  icon = 'danger',
  isDone = false,
}: ConfirmationDialogProps) {
  const { isOpen, open, close } = useDisclosure();

  const cancelButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (isDone) close();
  }, [isDone, close]);

  const triggerBtn = React.cloneElement(triggerButton, {
    onClick: open,
  });

  return (
    <>
      {triggerBtn}
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="sm:flex sm:items-start">
          {icon === 'danger' && (
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-700 sm:mx-0 sm:h-10 sm:w-10">
              <WarningIcon
                className="h-6 w-6 fill-red-600 dark:fill-white"
                aria-hidden="true"
              />
            </div>
          )}

          {icon === 'info' && (
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-700 sm:mx-0 sm:h-10 sm:w-10">
              <InfoCircleIcon
                className="h-6 w-6 fill-blue-600 dark:fill-white"
                aria-hidden="true"
              />
            </div>
          )}

          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle
              as="h3"
              className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
            >
              {title}
            </DialogTitle>
            {body && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {body}
                </p>
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
          {confirmButton}
        </div>
      </Dialog>
    </>
  );
}

export default ConfirmationDialog;
