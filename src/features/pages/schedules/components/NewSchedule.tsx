import ContentLayout from '@/components/Layouts/ContentLayout';
import { useNavigate } from 'react-router-dom';
import useCreateSchedule from '../hooks/useCreateSchedule';
import NewScheduleForm from './NewScheduleForm';
import useSectionId from '../hooks/useSectionId';

function NewSchedule() {
  const navigate = useNavigate();
  const createSchedule = useCreateSchedule();
  const sectionId = useSectionId();

  return (
    <ContentLayout title="New Schedule">
      <NewScheduleForm
        isSubmitting={createSchedule.isLoading}
        onSubmit={async (values) => {
          Promise.all(
            values.weekDays.map((weekday) => {
              const { weekDays, timeRange, ...rest } = values;
              const [startTime, endTime] = timeRange;
              return createSchedule.mutateAsync({
                ...rest,
                week_day: weekday,
                start_time: startTime,
                end_time: endTime,
                section: sectionId as string,
              });
            })
          ).then(() => {
            navigate('..');
          });
        }}
      />
    </ContentLayout>
  );
}

export default NewSchedule;
