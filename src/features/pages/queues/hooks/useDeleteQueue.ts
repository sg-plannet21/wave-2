import ApiClient from '@/services/api-client';
import { useMutation, useQueryClient } from 'react-query';
import { useNotificationStore } from '@/state/notifications';
import { getEntityKey } from '@/lib/entity-keys';
import { Queue } from '../types';

const deleteQueue = new ApiClient<Queue>('/queues').delete;

function useDeleteQueue() {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (id: string) => deleteQueue(id),
    onSuccess(_, queueId) {
      queryClient.setQueryData<Queue[]>(getEntityKey('queues'), (queues = []) =>
        queues.filter((queue) => queue.queue_id !== queueId)
      );

      addNotification({
        type: 'success',
        title: 'Queue Deleted',
        duration: 5000,
      });
    },
  });
}

export default useDeleteQueue;
