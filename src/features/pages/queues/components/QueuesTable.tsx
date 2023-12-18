import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import Badge from '@/components/Data-Display/Badge';
import useQueuesTableData, {
  QueueTableRecord,
} from '../hooks/useQueuesTableData';
import DeleteQueue from './DeleteQueue';
import QueueVersions from './QueueVersions';

function QueuesTable() {
  const { data, isLoading } = useQueuesTableData();

  const EntityLink = react.useCallback(
    (record: { entry: QueueTableRecord }) => (
      <Link to={record.entry.id}>{record.entry.name}</Link>
    ),
    []
  );

  const StatusBadge = (key: keyof QueueTableRecord) =>
    react.useCallback((record: { entry: QueueTableRecord }) => {
      const route = record.entry[key];
      if (route)
        return <Badge label={route as string} variant="primary" size="sm" />;
      return <Badge label="Not Set" variant="secondary" size="sm" />;
    }, []);

  const Versions = react.useCallback(
    (record: { entry: QueueTableRecord }) => (
      <QueueVersions id={record.entry.id} />
    ),
    []
  );

  const Delete = react.useCallback(
    (record: { entry: QueueTableRecord }) => (
      <div className="text-right">
        <DeleteQueue id={record.entry.id} name={record.entry.name} />
      </div>
    ),
    []
  );

  const columns: TableColumn<QueueTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
      Cell: EntityLink,
    },
    { field: 'priority', label: 'Priority' },
    {
      field: 'closed_route',
      label: 'Closed',
      Cell: StatusBadge('closed_route'),
    },
    {
      field: 'no_agents_route',
      label: 'No Agents',
      Cell: StatusBadge('no_agents_route'),
    },
    {
      field: 'max_queue_calls_route',
      label: 'Max Calls',
      Cell: StatusBadge('max_queue_calls_route'),
    },
    {
      field: 'max_queue_time_route',
      label: 'Max Time',
      Cell: StatusBadge('max_queue_time_route'),
    },
    {
      field: 'callback_route',
      label: 'Callback',
      Cell: StatusBadge('callback_route'),
    },
    {
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Versions,
    },
    {
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Delete,
    },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={3} />;

  return <WaveTable<QueueTableRecord> data={data} columns={columns} />;
}

export default QueuesTable;
