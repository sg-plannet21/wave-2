import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { Queue } from '../types';

const menuClient = new ApiClient<Queue>('/queues');

function useQueues() {
  return useQuery({
    queryKey: getEntityKey('queues'),
    queryFn: menuClient.getAll,
  });
}

export default useQueues;
