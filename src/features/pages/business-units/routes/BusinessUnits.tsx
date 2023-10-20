import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import BusinessUnitsTable from '../components/BusinessUnitsTable';

function BusinessUnits() {
  return (
    <ContentLayout title="Business Units">
      <div className="flex justify-end">
        <NewEntityLink to="new">New Business Unit</NewEntityLink>
      </div>
      <div className="mt-4">
        <BusinessUnitsTable />
      </div>
    </ContentLayout>
  );
}

export default BusinessUnits;
