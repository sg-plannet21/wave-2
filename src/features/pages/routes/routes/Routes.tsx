import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import RoutesTable from '../components/RoutesTable';

function Routes() {
  return (
    <ContentLayout title="Routes">
      <div className="flex justify-end">
        <NewEntityLink to="new">New Route</NewEntityLink>
      </div>
      <div className="mt-4">
        <RoutesTable />
      </div>
    </ContentLayout>
  );
}

export default Routes;
