import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { Schedule } from '../types';

const deleteSchedule = new ApiClient<Schedule>('/schedules').delete;

function useDeleteSchedule() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (id: string) => deleteSchedule(id),
    onSuccess(_, scheduleId) {
      queryClient.setQueryData<Schedule[]>(
        getEntityKey('schedules'),
        (schedules = []) =>
          schedules.filter((schedule) => schedule.schedule_id !== scheduleId)
      );

      addNotification({
        type: 'success',
        title: 'Schedule Deleted',
        duration: 5000,
      });
    },
  });
}

export default useDeleteSchedule;
