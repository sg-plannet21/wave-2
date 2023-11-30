import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import MenusTable from '../components/MenusTable';

function Menus() {
  return (
    <ContentLayout title="Menus">
      <div className="flex justify-end">
        <NewEntityLink to="new">New Menu</NewEntityLink>
      </div>
      <div className="mt-4">
        <MenusTable />
      </div>
    </ContentLayout>
  );
}

export default Menus;
