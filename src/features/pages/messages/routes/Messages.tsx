import ContentLayout from '@/components/Layouts/ContentLayout';
import NewEntityLink from '@/components/Navigation/New-Entity-Link';
import MessagesTable from '../components/MessagesTable';

function Messages() {
  return (
    <ContentLayout title="Messages">
      <div className="flex justify-end">
        <NewEntityLink to="new">Add Messages</NewEntityLink>
      </div>
      <div className="mt-4">
        <MessagesTable />
      </div>
    </ContentLayout>
  );
}

export default Messages;
