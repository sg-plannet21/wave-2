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
          id={id}
          isSubmitting={updateException.isLoading}
          onSubmit={async (data) => {
            await updateException.mutateAsync({
              ...data,
              schedule_exception_id: exceptionQuery.data.schedule_exception_id,
              start_time: new Date(data.dateRange[0]).toJSON(),
              end_time: new Date(data.dateRange[1]).toJSON(),
              section: exceptionQuery.data.section,
            });
            navigate('..');
          }}
          defaultValues={{
            ...exceptionQuery.data,
            dateRange: [
              new Date(exceptionQuery.data.start_time),
              new Date(exceptionQuery.data.end_time),
            ],
          }}
        />
      )}
    </ContentLayout>
  );
}

export default EditException;
