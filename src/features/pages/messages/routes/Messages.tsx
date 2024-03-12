import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import useAuth from '@/state/hooks/useAuth';
import { EntityRoles } from '@/entities/auth';
import MessagesTable from '../components/MessagesTable';

function Messages() {
  const { hasWriteAccess } = useAuth();
  const canWrite = hasWriteAccess([EntityRoles.Prompts]);

  return (
    <ContentLayout title="Messages">
      {canWrite && (
        <div className="flex justify-end">
          <NewEntityLink to="new">Add Messages</NewEntityLink>
        </div>
      )}
      <div className="mt-4">
        <MessagesTable />
      </div>
    </ContentLayout>
  );
}

export default Messages;
