import { useNavigate, useParams } from 'react-router-dom';
import ContentLayout from '@/components/Layouts/ContentLayout';
import LoadingComponent from '@/components/Feedback/LoadingComponent';
import { formatServerTime, utcFormat } from '@/lib/date-time';
import useSchedule from '../hooks/useSchedule';
import useUpdateSchedule from '../hooks/useUpdateSchedule';
import EditSchedulesForm from './EditSchedulesForm';
import useSelectedSchedules from '../hooks/useSelectedSchedules';
import { CustomFormValues, baseSchema, customSchema } from '../types/schema';
import useSchedulesLookup from '../hooks/useSchedulesLookup';

function EditSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const updateSchedule = useUpdateSchedule();
  const { schedules: scheduleList, dispatch } = useSelectedSchedules();
  const scheduleLookup = useSchedulesLookup();

  const scheduleQuery = useSchedule(
    id === 'edit' ? scheduleList[0] : (id as string)
  );

  if (scheduleQuery.isLoading) return <LoadingComponent />;

  const idList = id === 'edit' ? scheduleList : [id as string];

  return (
    <ContentLayout title="Edit Schedule">
      {scheduleQuery.data && scheduleLookup && (
        <EditSchedulesForm<typeof baseSchema | typeof customSchema>
          schema={scheduleQuery.data.is_default ? baseSchema : customSchema}
          isSubmitting={updateSchedule.isLoading}
          idList={idList}
          onSubmit={async (values) => {
            Promise.all(
              idList.map((scheduleId) => {
                const isDefault = scheduleQuery.data.is_default;
                return updateSchedule.mutateAsync({
                  id: scheduleId,
                  data: {
                    start_time: isDefault
                      ? null
                      : utcFormat((values as CustomFormValues).timeRange[0]),
                    end_time: isDefault
                      ? null
                      : utcFormat((values as CustomFormValues).timeRange[1]),
                    message_1: values.message_1,
                    message_2: values.message_2,
                    message_3: values.message_3,
                    message_4: values.message_4,
                    message_5: values.message_5,
                    route: values.route,
                    section: scheduleQuery.data.section,
                    week_day: scheduleLookup[scheduleId].week_day,
                  },
                });
              })
            ).then(() => {
              dispatch({ type: 'RESET' });
              navigate('..');
            });
          }}
          defaultValues={{
            ...scheduleQuery.data,
            ...(!scheduleQuery.data.is_default && {
              timeRange: [
                formatServerTime(scheduleQuery.data.start_time as string),
                formatServerTime(scheduleQuery.data.end_time as string),
              ],
            }),
          }}
          isDefault={scheduleQuery.data.is_default}
        />
      )}
    </ContentLayout>
  );
}

export default EditSchedule;
