import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import useAuth from '@/state/hooks/useAuth';
import { EntityRoles } from '@/entities/auth';
import SectionsTable from '../components/SectionsTable';

function Sections() {
  const { hasWriteAccess } = useAuth();
  const canWrite = hasWriteAccess([EntityRoles.Schedules]);

  return (
    <ContentLayout title="Sections">
      {canWrite && (
        <div className="flex justify-end">
          <NewEntityLink to="new">New Section</NewEntityLink>
        </div>
      )}
      <div className="mt-4">
        <SectionsTable />
      </div>
    </ContentLayout>
  );
}

export default Sections;
