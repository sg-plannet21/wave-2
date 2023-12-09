import ApiClient from '@/services/api-client';
import { useQuery } from 'react-query';
import { getEntityKey } from '@/lib/entity-keys';
import { Schedule } from '../types';

const getSchedules = new ApiClient<Schedule>('/schedules').getAll;

function useSchedules() {
  return useQuery({
    queryKey: getEntityKey('schedules'),
    queryFn: getSchedules,
  });
}

export default useSchedules;
