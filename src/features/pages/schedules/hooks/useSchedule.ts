import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { Schedule } from '../types';

function useSchedule(id: string) {
  return useQuery({
    queryKey: ['schedule', id],
    queryFn: () => new ApiClient<Schedule>('/schedules').get(id),
    enabled: !!id,
  });
}

export default useSchedule;
