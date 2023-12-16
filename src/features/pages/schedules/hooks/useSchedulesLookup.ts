import entityLookup from '@/lib/entity-lookup';
import { Schedule } from '../types';
import useSchedules from './useSchedules';

function useSchedulesLookup() {
  const { data } = useSchedules();

  return data && entityLookup<Schedule>(data, 'schedule_id');
}

export default useSchedulesLookup;
