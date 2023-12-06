import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { Queue } from '../types';

const queueClient = new ApiClient<Queue>('/queues');

function useQueue(id: string) {
  return useQuery({
    queryKey: ['queue', id],
    queryFn: () => queueClient.get(id),
    enabled: !!id,
  });
}

export default useQueue;
