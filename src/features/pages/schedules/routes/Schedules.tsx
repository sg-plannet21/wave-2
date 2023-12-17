import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import SchedulesTable from '../components/SchedulesTable';
import SectionMenu from '../../sections/components/SectionsMenu';
import EditSchedulesLink from '../components/EditSchedulesLink';
import useSelectedSchedules from '../hooks/useSelectedSchedules';

function Schedules() {
  const { schedules } = useSelectedSchedules();
  return (
    <ContentLayout title="Schedules">
      <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-end">
        <EditSchedulesLink to="edit" disabled={!schedules.length}>
          Edit Selected
        </EditSchedulesLink>
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
