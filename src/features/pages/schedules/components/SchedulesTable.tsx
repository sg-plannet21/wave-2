import Table, { TableColumn } from '@/components/Data-Display/Table';
import react, { useEffect } from 'react';
import Link from '@/components/Navigation/Link';
import WaveTableSkeleton from '@/components/Skeletons/Wave-Table/WaveTableSkeleton';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import useSchedulesTableData, {
  ScheduleTableRecord,
} from '../hooks/useSchedulesTableData';
import DeleteSchedule from './DeleteSchedule';
import useSelectedSchedules from '../hooks/useSelectedSchedules';

function SchedulesTable() {
  const { sectionName } = useParams();
  const { dispatch, isDefault, schedules } = useSelectedSchedules();
  const { data, isLoading } = useSchedulesTableData(
    decodeURIComponent(sectionName as string)
  );

  useEffect(() => {
    dispatch({ type: 'RESET' });
  }, [sectionName, dispatch]);

  const Check = react.useCallback(
    (record: { entry: ScheduleTableRecord }) => {
      const scheduleId = record.entry.id;
      const isChecked = schedules.includes(record.entry.id);
      const isDisabled =
        schedules.length > 0 && isDefault !== record.entry.isDefault;
      return (
        <div className="flex items-center">
          <input
            disabled={isDisabled}
            checked={isChecked}
            onChange={() =>
              isChecked
                ? dispatch({ type: 'DELETE', scheduleId })
                : dispatch({
                    type: 'ADD',
                    scheduleId,
                    isDefault: record.entry.isDefault,
                  })
            }
            type="checkbox"
            className={classNames(
              'form-checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-600',
              { 'cursor-not-allowed': isDisabled }
            )}
          />
          <label className="sr-only">checkbox</label>
        </div>
      );
    },
    [schedules, dispatch, isDefault]
  );

  const EntityLink = react.useCallback(
    (record: { entry: ScheduleTableRecord }) => (
      <Link className="relative" to={record.entry.id}>
        {record.entry.weekday}

        {record.entry.isActive && (
          <span className="top-[2px] -left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 animate-pulse rounded-full" />
        )}
      </Link>
    ),
    []
  );

  const Delete = react.useCallback(
    (record: { entry: ScheduleTableRecord }) => (
      <div className="text-right">
        <DeleteSchedule id={record.entry.id} name={record.entry.weekday} />
      </div>
    ),
    []
  );

  const columns: TableColumn<ScheduleTableRecord>[] = [
    { field: 'id', label: '', ignoreFiltering: true, Cell: Check },
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
