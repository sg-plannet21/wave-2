import ContentLayout from '@/components/Layouts/ContentLayout';
import EntryPointsTable from '../components/EntryPointsTable';

function EntryPoints() {
  return (
    <ContentLayout title="Entry Points">
      <div className="mt-4">
        <EntryPointsTable />
      </div>
    </ContentLayout>
  );
}

export default EntryPoints;
