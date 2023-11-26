import ContentLayout from '@/components/Layouts/ContentLayout';
import UnassignedQueuesTable from '../components/UnassignedQueuesTable';

function UnassignedQueues() {
  return (
    <ContentLayout title="Queues">
      <UnassignedQueuesTable />
    </ContentLayout>
  );
}

export default UnassignedQueues;
