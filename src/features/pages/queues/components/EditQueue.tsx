import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import useQueue from '../hooks/useQueue';
import useUpdateQueue from '../hooks/useUpdateQueue';
import QueueForm from './QueueForm';

function EditQueue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queueQuery = useQueue(id as string);
  const updateQueue = useUpdateQueue();

  if (queueQuery.isLoading) return <LoadingComponent />;

  return (
    <ContentLayout title={`Edit ${queueQuery.data?.queue_name}`}>
      {queueQuery.data && (
        <QueueForm
          isSubmitting={updateQueue.isLoading}
          onSubmit={async (data) => {
            await updateQueue.mutateAsync({
              id: id as string,
              data: { ...data, queue_id: id as string },
            });
            navigate('..');
          }}
          defaultValues={queueQuery.data}
        />
      )}
    </ContentLayout>
  );
}

export default EditQueue;
