import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import SectionsTable from '../components/SectionsTable';

function Sections() {
  return (
    <ContentLayout title="Sections">
      <div className="flex justify-end">
        <NewEntityLink to="new">New Section</NewEntityLink>
      </div>
      <div className="mt-4">
        <SectionsTable />
      </div>
    </ContentLayout>
  );
}

export default Sections;
