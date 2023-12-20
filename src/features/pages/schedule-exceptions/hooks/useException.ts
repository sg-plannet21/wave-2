import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { ScheduleException } from '../types';

function useException(id: string) {
  return useQuery({
    queryKey: ['schedule-exception', id],
    queryFn: () =>
      new ApiClient<ScheduleException>('/scheduleexceptions').get(id),
    enabled: !!id,
  });
}

export default useException;
