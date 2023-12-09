import { useMemo } from 'react';
import useSchedules from './useSchedules';

export type ScheduleTableRecord = {
  id: string;
  name: string;
  weekday: number;
};

function useSchedulesTableData() {
  const { data: schedules, isLoading, error } = useSchedules();

  const data: ScheduleTableRecord[] = useMemo(() => {
    if (!schedules) return [];

    return schedules.map((schedule) => ({
      id: schedule.schedule_id,
      name: schedule.section,
      weekday: schedule.week_day,
    }));
  }, [schedules]);

  return { data, isLoading, error };
}

export default useSchedulesTableData;
