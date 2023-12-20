import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import useException from '../hooks/useException';
import useUpdateException from '../hooks/useUpdateException';
import ExceptionForm from './ExceptionForm';

function EditException() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exceptionQuery = useException(id as string);
  const updateException = useUpdateException();

  if (exceptionQuery.isLoading) return <LoadingComponent />;

  return (
    <ContentLayout title="Edit Exception">
      {exceptionQuery.data && (
        <ExceptionForm
          isSubmitting={updateException.isLoading}
          onSubmit={async (data) => {
            await updateException.mutateAsync({
              id: id as string,
              data: { schedule_exception_id: id as string, ...data },
            });
            navigate('..');
          }}
          defaultValues={exceptionQuery.data}
        />
      )}
    </ContentLayout>
  );
}

export default EditException;
