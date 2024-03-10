import react, { useEffect } from 'react';
import WaveLink from '@/components/Navigation/Link';
import Table, { TableColumn } from '@/components/Data-Display/Table';
import { useParams, Link } from 'react-router-dom';
import DashboardComponent from '@/components/Skeletons/DashboardComponent';
import useActiveScheduleTableData, {
  ActiveScheduleTableRecord,
} from '../pages/schedules/hooks/useActiveScheduleTableData';

function ActiveSchedules() {
  const { businessUnitSlug } = useParams();
  const { data, isLoading, refetch } = useActiveScheduleTableData();

  useEffect(() => {
    if (businessUnitSlug) refetch();
  }, [refetch, businessUnitSlug]);

  const SectionsLink = react.useCallback(
    (record: { entry: ActiveScheduleTableRecord }) => (
      <WaveLink
        to={`schedules/${encodeURIComponent(record.entry.sectionName)}`}
      >
        {record.entry.sectionName}
      </WaveLink>
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

  if (isLoading)
    return <DashboardComponent numberOfRows={4} numberOfColumns={4} />;

  if (!data.length)
    return (
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          No {decodeURIComponent(businessUnitSlug as string)} Sections
        </h2>
        <p className="my-4 font-normal text-gray-700 dark:text-gray-400">
          Schedules define the direction of calls based on the time of day. Schedules
          are grouped into Sections. Create a new Section to get started.
        </p>
        <Link
          to="sections/new"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          New Section
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    );

  return (
    <div>
      <h2 className="pl-4 mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        Active {decodeURIComponent(businessUnitSlug as string)} Schedules
      </h2>
      <Table
        data={data.filter((schedule) => schedule.isActive)}
        columns={columns}
      />
    </div>
  );
}

export default ActiveSchedules;
