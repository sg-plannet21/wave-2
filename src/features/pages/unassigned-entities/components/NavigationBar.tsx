import { useMemo } from 'react';
import { ReactComponent as QueueIcon } from '@/assets/queue.svg';
import { ReactComponent as EntryPointIcon } from '@/assets/entry-point.svg';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import useUnassignedEntryPoints from '../hooks/useUnassignedEntryPoints';
import useUnassignedQueues from '../hooks/useUnassignedQueues';

interface NavItem {
  path: string;
  label: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  count?: number;
}

function NavigationBar() {
  const { data: queues } = useUnassignedQueues();
  const { data: entryPoints } = useUnassignedEntryPoints();

  const items: Array<NavItem> = useMemo(
    () => [
      {
        path: 'queues',
        label: 'Queues',
        icon: QueueIcon,
        count: queues?.length,
      },
      {
        path: 'entry-points',
        label: 'Entry Points',
        icon: EntryPointIcon,
        count: entryPoints?.length,
      },
    ],
    [queues?.length, entryPoints?.length]
  );

  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {items.map((navItem) => (
          <li key={navItem.path} className="me-2">
            <NavLink
              to={navItem.path}
              className={({ isActive }) =>
                classNames(
                  'relative flex items-center space-x-1 p-4 border-b-2 rounded-t-lg',
                  {
                    'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300':
                      !isActive,
                    'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500':
                      isActive,
                  }
                )
              }
            >
              <navItem.icon className="w-5 h-5 fill-current" />
              <span>{navItem.label}</span>
              {navItem && (
                <span
                  className={classNames(
                    'absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white border-2 border-white rounded-full top-2 -end-2 dark:border-gray-900',
                    {
                      'bg-blue-600': navItem.count,
                      'bg-gray-600 dark:bg-gray-500': !navItem.count,
                    }
                  )}
                >
                  {navItem.count}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavigationBar;
