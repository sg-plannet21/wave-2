import ContentLayout from '@/components/Layouts/ContentLayout';
import QueuesTable from '../components/QueuesTable';

function Queues() {
  return (
    <ContentLayout width='xl' title="Queues">
      <QueuesTable />
    </ContentLayout>
  );
}

export default Queues;
