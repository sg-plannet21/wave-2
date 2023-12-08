import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { WaveError } from '@/entities/wave-error';
import { getEntityKey } from '@/lib/entity-keys';
import { FormValues } from '../types/schema';
import { Queue } from '../types';

const updateQueue = new ApiClient<Queue>('/queues').update;

interface UpdateVariables {
  id: string;
  data: FormValues & Pick<Queue, 'queue_id' | 'queue_name'>;
}

function useUpdateQueue() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation<Queue, WaveError, UpdateVariables>({
    mutationFn: ({ id, data }) => updateQueue(id, data),
    onSuccess(updatedQueue) {
      queryClient.setQueryData<Queue>(
        ['queue', updatedQueue.queue_id],
        updatedQueue
      );

      queryClient.setQueryData<Queue[]>(getEntityKey('queues'), (queues = []) =>
        queues.map((queue) =>
          queue.queue_id === updatedQueue.queue_id ? updatedQueue : queue
        )
      );

      addNotification({
        type: 'success',
        title: 'Queue Updated',
        message: `${updatedQueue.queue_name} has been updated.`,
        duration: 5000,
      });
    },
  });
}

export default useUpdateQueue;
