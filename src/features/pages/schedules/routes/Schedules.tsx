import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import SchedulesTable from '../components/SchedulesTable';

function Schedules() {
  return (
    <ContentLayout title="Schedules">
      <div className="flex justify-end">
        <NewEntityLink to="new">New Schedule</NewEntityLink>
      </div>
      <div className="mt-4">
        <SchedulesTable />
      </div>
    </ContentLayout>
  );
}

export default Schedules;
