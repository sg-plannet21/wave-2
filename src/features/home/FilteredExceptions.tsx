import react, { useEffect } from 'react';
import Link from '@/components/Navigation/Link';
import Table, { TableColumn } from '@/components/Data-Display/Table';
import { useParams } from 'react-router-dom';
import DashboardComponent from '@/components/Skeletons/DashboardComponent';
import dayjs from 'dayjs';
import { TimeDifferenceReturn } from '@/lib/date-time';
import { chain } from 'lodash';
import useActiveExceptionTableData from '../pages/schedule-exceptions/hooks/useActiveExceptionTableData';
import { ExceptionTableRecord } from '../pages/schedule-exceptions/hooks/useExceptionsTableData';

const dateFormat = 'ddd D MMM YYYY, h:mm a';

interface Props {
  status: TimeDifferenceReturn['status'];
}

function FilteredExceptions({ status }: Props) {
  const { businessUnitSlug } = useParams();
  const { data, isLoading, refetch } = useActiveExceptionTableData();

  useEffect(() => {
    if (businessUnitSlug) refetch();
  }, [refetch, businessUnitSlug]);

  const EntityLink = react.useCallback(
    (record: { entry: ExceptionTableRecord }) => (
      <Link
        to={`schedule-exceptions/${encodeURIComponent(record.entry.section)}/${record.entry.id}`}
      >
        {record.entry.name}
      </Link>
    ),
    []
  );

  const SectionsLink = react.useCallback(
    (record: { entry: ExceptionTableRecord }) => (
      <Link
        to={`schedule-exceptions/${encodeURIComponent(record.entry.section)}`}
      >
        {record.entry.section}
      </Link>
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
  const columns: TableColumn<ExceptionTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
      Cell: EntityLink,
    },
    {
      field: 'section',
      label: 'Section',
      Cell: SectionsLink,
    },
    { field: 'startDate', label: 'Start', Cell: StartDate },
    { field: 'endDate', label: 'End', Cell: EndDate },
    { field: 'route', label: 'Route' },
  ];

  if (isLoading)
    return <DashboardComponent numberOfRows={4} numberOfColumns={4} />;

  const ordered = chain(data)
    .filter((exception) => exception.difference.status === status)
    .orderBy('startDate')
    .value();

  if (!ordered.length) return null;

  return (
    <div>
      <h2 className="pl-4 mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        {status === 'ACTIVE' ? 'Active' : 'Upcoming'}{' '}
        {decodeURIComponent(businessUnitSlug as string)} Schedule Exceptions
      </h2>
      <Table data={ordered} columns={columns} />
    </div>
  );
}

export default FilteredExceptions;
