import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import useAuth from '@/state/hooks/useAuth';
import { EntityRoles } from '@/entities/auth';
import MenusTable from '../components/MenusTable';

function Menus() {
  const { hasWriteAccess } = useAuth();
  const canWrite = hasWriteAccess([EntityRoles.Menus]);

  return (
    <ContentLayout title="Menus">
      {canWrite && (
        <div className="flex justify-end">
          <NewEntityLink to="new">New Menu</NewEntityLink>
        </div>
      )}
      <div className="mt-4">
        <MenusTable />
      </div>
    </ContentLayout>
  );
}

export default Menus;
