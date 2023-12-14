import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import useSchedule from '../hooks/useSchedule';
import useUpdateSchedule from '../hooks/useUpdateSchedule';
import EditSchedulesForm from './EditSchedulesForm';
import { customSchema } from '../types/schema';

function EditSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const scheduleQuery = useSchedule(id as string);
  const updateSchedule = useUpdateSchedule();

  if (scheduleQuery.isLoading) return <LoadingComponent />;

  return (
    <ContentLayout title="Edit Schedule">
      {scheduleQuery.data && (
        <EditSchedulesForm<typeof customSchema>
          schema={customSchema}
          isSubmitting={updateSchedule.isLoading}
          onSubmit={async (data) => {
            // eslint-disable-next-line no-console
            console.log('submit', data);
            /*
            await updateSchedule.mutateAsync({
              id: id as string,
              data: { schedule_id: id as string, ...data },
            });
                        */
            navigate('..');
          }}
          defaultValues={scheduleQuery.data}
          isDefault={scheduleQuery.data.is_default}
        />
      )}
    </ContentLayout>
  );
}

export default EditSchedule;
