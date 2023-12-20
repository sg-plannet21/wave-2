import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { ScheduleException } from '../types';

const deleteException = new ApiClient<ScheduleException>('/scheduleexceptions')
  .delete;

function useDeleteException() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (id: string) => deleteException(id),
    onSuccess(_, exceptionId) {
      queryClient.setQueryData<ScheduleException[]>(
        getEntityKey('schedule-exceptions'),
        (exceptions = []) =>
          exceptions.filter(
            (exception) => exception.schedule_exception_id !== exceptionId
          )
      );

      addNotification({
        type: 'success',
        title: 'Schedule Exception Deleted',
        duration: 5000,
      });
    },
  });
}

export default useDeleteException;
