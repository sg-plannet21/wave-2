import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { WaveError } from '@/entities/wave-error';
import { getEntityKey } from '@/lib/entity-keys';
import { Schedule, Weekdays } from '../types';
import { FormValues } from '../types/schema';

const updateSchedule = new ApiClient<Schedule>('/schedules').update;

interface UpdateVariables {
  id: string;
  data: FormValues & Pick<Schedule, 'schedule_id'>;
}

function useUpdateSchedule() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation<Schedule, WaveError, UpdateVariables>({
    mutationFn: ({ id, data }) => updateSchedule(id, data),
    onSuccess(newSchedule) {
      queryClient.setQueryData<Schedule>(
        ['schedule', newSchedule.schedule_id],
        newSchedule
      );

      queryClient.setQueryData<Schedule[]>(
        getEntityKey('schedules'),
        (schedules = []) =>
          schedules.map((schedule) =>
            schedule.schedule_id === newSchedule.schedule_id
              ? newSchedule
              : schedule
          )
      );
      addNotification({
        type: 'success',
        title: 'Schedule Updated',
        message: `${Weekdays[newSchedule.week_day]} has been updated.`,
        duration: 5000,
      });
    },
  });
}

export default useUpdateSchedule;
