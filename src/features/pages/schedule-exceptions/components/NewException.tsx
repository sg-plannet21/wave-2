import ContentLayout from '@/components/Layouts/ContentLayout';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import useCreateException from '../hooks/useCreateException';
import ExceptionForm from './ExceptionForm';
import useSectionId from '../../schedules/hooks/useSectionId';

function NewException() {
  const navigate = useNavigate();
  const createException = useCreateException();
  const sectionId = useSectionId();

  if (!sectionId) return <LoadingComponent />;

  return (
    <ContentLayout title="New Exception">
      <ExceptionForm
        isSubmitting={createException.isLoading}
        onSubmit={async (data) => {
          await createException.mutateAsync({
            ...data,
            start_time: new Date(data.dateRange[0]).toJSON(),
            end_time: new Date(data.dateRange[1]).toJSON(),
            section: sectionId,
          });
          navigate('..');
        }}
      />
    </ContentLayout>
  );
}

export default NewException;
