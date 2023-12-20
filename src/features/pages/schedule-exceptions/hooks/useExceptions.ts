import ApiClient from '@/services/api-client';
import { UseQueryOptions, useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { ScheduleException } from '../types';

const getExceptions = new ApiClient<ScheduleException>('/scheduleexceptions')
  .getAll;

function useExceptions(options?: UseQueryOptions<ScheduleException[]>) {
  return useQuery({
    queryKey: getEntityKey('schedule-exceptions'),
    queryFn: getExceptions,
    ...options,
  });
}

export default useExceptions;
