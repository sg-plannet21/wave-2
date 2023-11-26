import ContentLayout from '@/components/Layouts/ContentLayout';
import UnassignedEntryPointsTable from '../components/UnassignedEntryPointsTable';

function UnassignedEntryPoints() {
  return (
    <ContentLayout title="Entry Points">
      <UnassignedEntryPointsTable />
    </ContentLayout>
  );
}

export default UnassignedEntryPoints;
