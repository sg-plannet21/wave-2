import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { WaveError } from '@/entities/wave-error';
import { useNotificationStore } from '@/state/notifications';
import storage from '@/utils/storage';
import { Queue } from '../../queues/types';

interface UpdateVariables {
  id: string;
  queue_name: string;
}

const apiClient = new ApiClient<Queue>('/queues');

function useAssignQueue() {
  const businessUnitId = storage.businessUnit.getBusinessUnit().id;
  const { addNotification } = useNotificationStore();
  const queryClient = useQueryClient();

  return useMutation<Queue, WaveError, UpdateVariables>({
    mutationFn: (data) =>
      apiClient.update(`${data.id}/?unassigned=true`, {
        queue_id: data.id,
        queue_name: data.queue_name,
        businesss_unit: businessUnitId,
      }),

    onSuccess(data) {
      queryClient.setQueryData<Queue[]>(
        'unassigned-queues',
        (queues = []) =>
          queues.filter((queue) => queue.queue_id !== data.queue_id)
      );

      addNotification({
        type: 'success',
        title: 'Queue Updated',
        message: `${data.queue_name} has been assigned.`,
        duration: 5000,
      });
    },
  });
}

export default useAssignQueue;
