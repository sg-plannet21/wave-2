import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import useSchedule from '../hooks/useSchedule';
import SchedulesForm from './SchedulesForm';
import useUpdateSchedule from '../hooks/useUpdateSchedule';

function EditSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sectionQuery = useSchedule(id as string);
  const updateSchedule = useUpdateSchedule();

  if (sectionQuery.isLoading) return <LoadingComponent />;

  return (
    <ContentLayout title="Edit Schedule">
      {sectionQuery.data && (
        <SchedulesForm
          isSubmitting={updateSchedule.isLoading}
          onSubmit={async (data) => {
            await updateSchedule.mutateAsync({
              id: id as string,
              data: { schedule_id: id as string, ...data },
            });
            navigate('..');
          }}
          defaultValues={sectionQuery.data}
        />
      )}
    </ContentLayout>
  );
}

export default EditSchedule;
