import { ReactComponent as SupervisorIcon } from '@/assets/supervisor.svg';
import { ReactComponent as AdminIcon } from '@/assets/administrator.svg';
import { ReactComponent as MenuIcon } from '@/assets/menu.svg';
import { ReactComponent as MessageIcon } from '@/assets/message.svg';
import { ReactComponent as QueueIcon } from '@/assets/queue.svg';
import { ReactComponent as ScheduleIcon } from '@/assets/schedule.svg';
import { ReactComponent as EntryPointIcon } from '@/assets/entry-point.svg';
import { TableColumn } from '@/components/Data-Display/Table';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import classNames from 'classnames';
import { EntityRoles } from '@/entities/auth';
import { useCallback } from 'react';
import useUsersTableData, { UserTableRecord } from '../hooks/useUsersTableData';

const iconClasses = 'w-6 h-6 fill-current';
const activeClasses = 'fill-green-600 dark:fill-green-400';
const inactiveClasses = 'fill-gray-600 dark:fill-gray-600';

function UsersTable() {
  const { data, isLoading } = useUsersTableData();

  const renderRoleIcon = useCallback(
    (user: UserTableRecord, role: EntityRoles) => {
      if (user.isSuperUser)
        return <AdminIcon className={`${iconClasses} ${activeClasses}`} />;

      if (user.roles.includes(EntityRoles.Administrator))
        return <SupervisorIcon className={`${iconClasses} ${activeClasses}`} />;

      let IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

      switch (role) {
        case EntityRoles.EntryPoints:
          IconComponent = EntryPointIcon;
          break;

        case EntityRoles.Menus:
          IconComponent = MenuIcon;
          break;

        case EntityRoles.Queues:
          IconComponent = QueueIcon;
          break;

        case EntityRoles.Prompts:
          IconComponent = MessageIcon;
          break;

        case EntityRoles.Schedules:
          IconComponent = ScheduleIcon;
          break;

        case EntityRoles.Administrator:
          IconComponent = SupervisorIcon;
          break;

        default:
          return <>x</>;
      }

      const hasRole = user.roles.includes(role);
      return (
        <IconComponent
          className={classNames(
            iconClasses,
            'cursor-pointer hover:scale-125 transition-transform duration-300',
            {
              [activeClasses]: hasRole,
              [inactiveClasses]: !hasRole,
            }
          )}
        />
      );
    },
    []
  );

  const columns: TableColumn<UserTableRecord>[] = [
    { field: 'username', label: 'Username' },
    {
      field: 'id',
      label: 'Entry Points',
      ignoreFiltering: true,
      Cell: ({ entry }) => renderRoleIcon(entry, EntityRoles.EntryPoints),
    },
    {
      field: 'id',
      label: 'Menus',
      ignoreFiltering: true,
      Cell: ({ entry }) => renderRoleIcon(entry, EntityRoles.Menus),
    },
    {
      field: 'id',
      label: 'Queues',
      ignoreFiltering: true,
      Cell: ({ entry }) => renderRoleIcon(entry, EntityRoles.Queues),
    },
    {
      field: 'id',
      label: 'Messages',
      ignoreFiltering: true,
      Cell: ({ entry }) => renderRoleIcon(entry, EntityRoles.Prompts),
    },
    {
      field: 'id',
      label: 'Schedules',
      ignoreFiltering: true,
      Cell: ({ entry }) => renderRoleIcon(entry, EntityRoles.Schedules),
    },
    {
      field: 'id',
      label: 'Supervisor',
      ignoreFiltering: true,
      Cell: ({ entry }) => renderRoleIcon(entry, EntityRoles.Administrator),
    },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={8} />;

  return <WaveTable<UserTableRecord> data={data} columns={columns} />;
}

export default UsersTable;
