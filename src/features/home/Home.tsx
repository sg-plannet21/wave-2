import Link from '@/components/Navigation/Link';
import Table, { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import TableSkeleton from '@/components/Skeletons/Table/TableSkeleton';
import useActiveScheduleTableData, {
  ActiveScheduleTableRecord,
} from '../pages/schedules/hooks/useActiveScheduleTableData';

function Home() {
  const { data, isLoading } = useActiveScheduleTableData();

  const SectionsLink = react.useCallback(
    (record: { entry: ActiveScheduleTableRecord }) => (
      <Link to={`schedules/${encodeURIComponent(record.entry.sectionName)}`}>
        {record.entry.sectionName}
      </Link>
    ),
    []
  );

  const columns: TableColumn<ActiveScheduleTableRecord>[] = [
    {
      field: 'section',
      label: 'Section',
      Cell: SectionsLink,
    },
    { field: 'startTime', label: 'Start Time' },
    { field: 'endTime', label: 'End Time' },
    { field: 'route', label: 'Route' },
  ];

  if (isLoading) return <TableSkeleton numberOfRows={4} numberOfColumns={4} />;

  return (
    <div className="w-full my-12 mx-6 p-6 rounded-lg shadow">
      <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        Active Schedules
      </h2>
      <Table
        data={data.filter((schedule) => schedule.isActive)}
        columns={columns}
      />
      <Link to="schedules">Go to Schedules</Link>
    </div>
  );
}

export default Home;
