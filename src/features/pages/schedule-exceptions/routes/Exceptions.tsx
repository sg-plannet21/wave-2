import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import useAuth from '@/state/hooks/useAuth';
import { EntityRoles } from '@/entities/auth';
import ExceptionsTable from '../components/ExceptionsTable';
import SectionMenu from '../../sections/components/SectionsMenu';

function Exceptions() {
  const { hasWriteAccess } = useAuth();
  const canWrite = hasWriteAccess([EntityRoles.Schedules]);

  return (
    <ContentLayout title="Schedule Exceptions">
      <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-end">
        {canWrite && (
          <NewEntityLink to="new">New Schedule Exception</NewEntityLink>
        )}
        <SectionMenu />
      </div>
      <div className="mt-4">
        <ExceptionsTable />
      </div>
    </ContentLayout>
  );
}

export default Exceptions;
