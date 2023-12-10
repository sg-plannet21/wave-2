import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import SchedulesTable from '../components/SchedulesTable';
import SectionMenu from '../../sections/components/SectionsMenu';

function Schedules() {
  return (
    <ContentLayout title="Schedules">
      <div className="flex gap-2 items-center justify-end">
        <NewEntityLink to="new">New Schedule</NewEntityLink>
        <SectionMenu />
      </div>
      <div className="mt-4">
        <SchedulesTable />
      </div>
    </ContentLayout>
  );
}

export default Schedules;
