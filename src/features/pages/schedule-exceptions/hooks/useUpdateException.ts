import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { WaveError } from '@/entities/wave-error';
import { getEntityKey } from '@/lib/entity-keys';
import { ScheduleException, ScheduleExceptionDto } from '../types';

const updateException = new ApiClient<ScheduleException>('/scheduleexceptions')
  .update;



function useUpdateException() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation<ScheduleException, WaveError, ScheduleExceptionDto>({
    mutationFn: (data) => updateException(data.schedule_exception_id, data),
    onSuccess(newException) {
      queryClient.setQueryData<ScheduleException>(
        ['schedule-exception', newException.schedule_exception_id],
        newException
      );

      queryClient.setQueryData<ScheduleException[]>(
        getEntityKey('schedule-exceptions'),
        (exceptions = []) =>
          exceptions.map((exception) =>
            exception.schedule_exception_id ===
            newException.schedule_exception_id
              ? newException
              : exception
          )
      );
      addNotification({
        type: 'success',
        title: 'Exception Updated',
        message: `${newException.description} has been updated.`,
        duration: 5000,
      });
    },
  });
}

export default useUpdateException;
