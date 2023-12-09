import { TableColumn } from '@/components/Data-Display/Table';
import react from 'react';
import Link from '@/components/Navigation/Link';
import WaveTable from '@/components/Composite/Wave-Table';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import useSchedulesTableData, {
  ScheduleTableRecord,
} from '../hooks/useSchedulesTableData';
import DeleteSchedule from './DeleteSchedule';

function SchedulesTable() {
  const { data, isLoading } = useSchedulesTableData();

  const EntityLink = react.useCallback(
    (section: { entry: ScheduleTableRecord }) => (
      <Link to={section.entry.id}>{section.entry.name}</Link>
    ),
    []
  );

  const Delete = react.useCallback(
    (section: { entry: ScheduleTableRecord }) => (
      <div className="text-right">
        <DeleteSchedule id={section.entry.id} name={section.entry.name} />
      </div>
    ),
    []
  );

  const columns: TableColumn<ScheduleTableRecord>[] = [
    {
      field: 'name',
      label: 'name',
      Cell: EntityLink,
    },
    {
      field: 'weekday',
      label: 'Day',
    },
    {
      field: 'id',
      label: '',
      ignoreFiltering: true,
      Cell: Delete,
    },
  ];

  if (isLoading) return <WaveTableSkeleton numberOfColumns={2} />;

  return <WaveTable<ScheduleTableRecord> data={data} columns={columns} />;
}

export default SchedulesTable;
