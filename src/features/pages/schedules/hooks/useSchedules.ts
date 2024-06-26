import ApiClient from '@/services/api-client';
import { UseQueryOptions, useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { Schedule } from '../types';

const getSchedules = new ApiClient<Schedule>('/schedules').getAll;

function useSchedules(options?: UseQueryOptions<Schedule[]>) {
  return useQuery({
    queryKey: getEntityKey('schedules'),
    queryFn: getSchedules,
    refetchInterval: 1 * 60 * 1000,
    ...options,
  });
}

export default useSchedules;
