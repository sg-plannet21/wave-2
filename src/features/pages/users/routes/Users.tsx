import ContentLayout from '@/components/Layouts/ContentLayout';
import UsersTable from '../components/UserTable';

function Routes() {
  return (
    <ContentLayout title="Users">
      <div className="mt-4">
        <UsersTable />
      </div>
    </ContentLayout>
  );
}

export default Routes;
