import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import useAuth from '@/state/hooks/useAuth';
import { EntityRoles } from '@/entities/auth';
import SchedulesTable from '../components/SchedulesTable';
import SectionMenu from '../../sections/components/SectionsMenu';
import EditSchedulesLink from '../components/EditSchedulesLink';
import useSelectedSchedules from '../hooks/useSelectedSchedules';

function Schedules() {
  const { schedules } = useSelectedSchedules();
  const { hasWriteAccess } = useAuth();
  const canWrite = hasWriteAccess([EntityRoles.Schedules]);

  return (
    <ContentLayout title="Schedules">
      <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-end">
        {canWrite && (
          <EditSchedulesLink to="edit" disabled={!schedules.length}>
            Edit Selected
          </EditSchedulesLink>
        )}
        {canWrite && <NewEntityLink to="new">New Schedule</NewEntityLink>}
        <SectionMenu />
      </div>
      <div className="mt-4">
        <SchedulesTable />
      </div>
    </ContentLayout>
  );
}

export default Schedules;
