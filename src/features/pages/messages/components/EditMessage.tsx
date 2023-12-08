import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import MessageForm from './MessageForm';
import useUpdateMessage from '../hooks/useUpdateMessage';
import useMessage from '../hooks/useMessage';

function EditMessage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const messageQuery = useMessage(id as string);
  const updateMessage = useUpdateMessage();

  if (messageQuery.isLoading) return <LoadingComponent />;

  return (
    <ContentLayout title="Edit Message">
      {messageQuery.data && (
        <MessageForm
          isSubmitting={updateMessage.isLoading}
          onSubmit={async (data) => {
            await updateMessage.mutateAsync({
              prompt_id: messageQuery.data.prompt_id,
              prompt_detail: messageQuery.data.prompt_detail,
              prompt_name: data.prompt_name,
            });
            navigate('..');
          }}
          defaultValues={messageQuery.data}
        />
      )}
    </ContentLayout>
  );
}

export default EditMessage;
