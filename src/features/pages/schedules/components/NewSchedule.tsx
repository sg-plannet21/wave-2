import ContentLayout from '@/components/Layouts/ContentLayout';
import { useNavigate } from 'react-router-dom';
import useCreateSchedule from '../hooks/useCreateSchedule';
import SchedulesForm from './SchedulesForm';

function NewSchedule() {
  const navigate = useNavigate();
  const createSchedule = useCreateSchedule();

  return (
    <ContentLayout title="New Schedule">
      <SchedulesForm
        isSubmitting={createSchedule.isLoading}
        onSubmit={async (values) => {
          // eslint-disable-next-line no-console
          console.log('submit', values);
          // await createSchedule.mutateAsync(values);
          navigate('..');
        }}
      />
    </ContentLayout>
  );
}

export default NewSchedule;
