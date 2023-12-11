import Table, { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import { useParams } from 'react-router-dom';
import useSchedulesTableData, {
  ScheduleTableRecord,
} from '../hooks/useSchedulesTableData';
import DeleteSchedule from './DeleteSchedule';

function SchedulesTable() {
  const { sectionName } = useParams();
  const { data, isLoading } = useSchedulesTableData(
    decodeURIComponent(sectionName as string)
  );

  const EntityLink = react.useCallback(
    (section: { entry: ScheduleTableRecord }) => (
      <Link className="relative" to={section.entry.id}>
        {section.entry.weekday}

        {section.entry.isActive && (
          <span className="top-[2px] -left-5 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 animate-pulse rounded-full" />
        )}
      </Link>
    ),
    []
  );

  const Delete = react.useCallback(
    (section: { entry: ScheduleTableRecord }) => (
      <div className="text-right">
        <DeleteSchedule id={section.entry.id} name={section.entry.weekday} />
      </div>
    ),
    []
  );

  const columns: TableColumn<ScheduleTableRecord>[] = [
    {
      field: 'weekday',
      label: 'Day',
      Cell: EntityLink,
    },
    { field: 'startTime', label: 'Start Time' },
    { field: 'endTime', label: 'End Time' },
    { field: 'route', label: 'Route' },
    {
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Delete,
    },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={6} />;

  return <Table<ScheduleTableRecord> data={data} columns={columns} />;
}

export default SchedulesTable;
