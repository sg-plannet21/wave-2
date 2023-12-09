import { useMutation, useQueryClient } from 'react-query';
import ApiClient from '@/services/api-client';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { FormValues } from '../types/schema';
import { Schedule, Weekdays } from '../types';

const createSchedule = new ApiClient<Schedule>('/schedules').create;

function useCreateSchedule() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (data: FormValues) => createSchedule(data),
    onSuccess(newSchedule) {
      queryClient.setQueryData<Schedule[]>(
        getEntityKey('schedules'),
        (schedules = []) => [newSchedule, ...schedules]
      );
      addNotification({
        type: 'success',
        title: 'Schedule Created',
        message: `${Weekdays[newSchedule.week_day]} has been created.`,
        duration: 5000,
      });
    },
  });
}

export default useCreateSchedule;
