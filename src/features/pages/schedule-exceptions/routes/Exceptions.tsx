import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import ExceptionsTable from '../components/ExceptionsTable';
import SectionMenu from '../../sections/components/SectionsMenu';

function Exceptions() {
  return (
    <ContentLayout title="Schedule Exceptions">
      <div className="flex flex-col lg:flex-row gap-2 lg:items-center lg:justify-end">
        <NewEntityLink to="new">New Schedule Exception</NewEntityLink>
        <SectionMenu />
      </div>
      <div className="mt-4">
        <ExceptionsTable />
      </div>
    </ContentLayout>
  );
}

export default Exceptions;
