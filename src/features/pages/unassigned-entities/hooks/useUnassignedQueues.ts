import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { Queue } from '../../queues/types';

const getUnassignedQueues = new ApiClient<Queue>('/queues/?unassigned=true')
  .getAll;

function useUnassignedQueues() {
  return useQuery({
    queryKey: 'unassigned-queues',
    queryFn: getUnassignedQueues,
    refetchInterval: 1 * 60 * 1000,
  });
}

export default useUnassignedQueues;
