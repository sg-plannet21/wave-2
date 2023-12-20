import { useMutation, useQueryClient } from 'react-query';
import ApiClient from '@/services/api-client';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { ScheduleException, ScheduleExceptionDto } from '../types';

const createException = new ApiClient<ScheduleException>('/scheduleexceptions')
  .create;

function useCreateException() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (data: Omit<ScheduleExceptionDto, 'schedule_exception_id'>) =>
      createException(data),
    onSuccess(newException) {
      queryClient.setQueryData<ScheduleException[]>(
        getEntityKey('schedule-exceptions'),
        (exceptions = []) => [newException, ...exceptions]
      );
      addNotification({
        type: 'success',
        title: 'Exception Created',
        message: `${newException.description} has been created.`,
        duration: 5000,
      });
    },
  });
}

export default useCreateException;
