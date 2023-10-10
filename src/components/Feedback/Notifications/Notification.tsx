import { ReactComponent as CheckCircleIcon } from '@/assets/check-circle.svg';
import { ReactComponent as XIcon } from '@/assets/cross.svg';
import { ReactComponent as ErrorCircleIcon } from '@/assets/error-circle.svg';
import { ReactComponent as InfoCircleIcon } from '@/assets/info-circle.svg';
import { ReactComponent as WarningIcon } from '@/assets/warning.svg';
import { INotification } from '@/state/contexts/NotificationContext';
import { Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

const icons = {
  success: (
    <CheckCircleIcon
      className="h-6 w-6 fill-green-500 dark:fill-green-400"
      aria-hidden="true"
    />
  ),
  info: (
    <InfoCircleIcon
      className="h-6 w-6 fill-indigo-600 dark:fill-indigo-200"
      aria-hidden="true"
    />
  ),
  warning: (
    <WarningIcon
      className="h-6 w-6 fill-orange-400 dark:fill-orange-400"
      aria-hidden="true"
    />
  ),
  error: (
    <ErrorCircleIcon
      className="h-6 w-6 fill-red-600 dark:fill-red-400"
      aria-hidden="true"
    />
  ),
};

interface Props {
  notification: Omit<INotification, 'type'> & { type: keyof typeof icons };
  onDismiss: (notificationId: number) => void;
}

function Notification({
  notification: { id, title, type, duration, message },
  onDismiss,
}: Props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) {
      const timeoutId = setTimeout(() => onDismiss(id), 300);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [show, id, onDismiss]);

  useEffect(() => {
    if (duration) {
      const timeoutId = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [duration]);

  return (
    <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
      <Transition
        appear
        show={show}
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="max-w-sm w-full rounded-lg shadow-lg bg-white dark:bg-slate-700 dark:text-gray-50 pointer-events-auto ring-1 ring-black dark:ring-gray-500 ring-opacity-5 overflow-hidden">
          <div className="p-4" role="alert" aria-label={title}>
            <div className="flex items-start">
              <div className="flex-shrink-0">{icons[type]}</div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm mb-0 font-medium text-gray-900 dark:text-white">
                  {title}
                </p>
                <p className="mt-1 mb-0 text-sm text-gray-500 dark:text-gray-300">
                  {message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  type="button"
                  className="bg-white dark:bg-slate-600 rounded-md inline-flex text-gray-400 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-emerald-400"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon
                    className="h-5 w-5 dark:fill-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default Notification;
