import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import dayjs from 'dayjs';
import { BadgeProps } from '@/components/Data-Display/Badge/Badge';
import Badge from '@/components/Data-Display/Badge';
import useAuth from '@/state/hooks/useAuth';
import { EntityRoles } from '@/entities/auth';
import DeleteException from './DeleteException';
import ExceptionVersions from './ExceptionVersions';
import useSectionExceptionsTableData from '../hooks/useSectionExceptionsTableData';
import { ExceptionTableRecord } from '../hooks/useExceptionsTableData';

const dateFormat = 'ddd D MMM YYYY, h:mm a';

function ExceptionsTable() {
  const { data, isLoading } = useSectionExceptionsTableData();
  const { hasWriteAccess } = useAuth();

  const EntityLink = react.useCallback(
    (record: { entry: ExceptionTableRecord }) => (
      <Link to={record.entry.id}>{record.entry.name}</Link>
    ),
    []
  );

  const StartDate = react.useCallback(
    (record: { entry: ExceptionTableRecord }) => (
      <span>{dayjs(record.entry.startDate).format(dateFormat)}</span>
    ),
    []
  );

  const EndDate = react.useCallback(
    (record: { entry: ExceptionTableRecord }) => (
      <span>{dayjs(record.entry.endDate).format(dateFormat)}</span>
    ),
    []
  );

  const Status = react.useCallback(
    (record: { entry: ExceptionTableRecord }) => {
      const { label, status } = record.entry.difference;
      let variant: BadgeProps['variant'];
      switch (status) {
        case 'UPCOMING':
          variant = 'primary';
          break;
        case 'ACTIVE':
          variant = 'success';
          break;
        default:
          variant = 'secondary';
          break;
      }

      return <Badge label={label} variant={variant} size="sm" />;
    },
    []
  );

  const Versions = react.useCallback(
    (record: { entry: ExceptionTableRecord }) => (
      <ExceptionVersions id={record.entry.id} />
    ),
    []
  );

  const Delete = react.useCallback(
    (record: { entry: ExceptionTableRecord }) => (
      <div className="text-right">
        <DeleteException id={record.entry.id} name={record.entry.name} />
      </div>
    ),
    []
  );

  const columns: TableColumn<ExceptionTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
      Cell: EntityLink,
    },
    { field: 'startDate', label: 'Start', Cell: StartDate },
    { field: 'endDate', label: 'End', Cell: EndDate },
    {
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Status,
    },
    { field: 'route', label: 'Route' },
    {
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Versions,
    },
  ];

  if (hasWriteAccess([EntityRoles.Schedules])) {
    columns.push({
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Delete,
    });
  }

  if (isLoading) return <WaveTableSkeleton numberOfColumns={6} />;

  return <WaveTable<ExceptionTableRecord> data={data} columns={columns} />;
}

export default ExceptionsTable;
