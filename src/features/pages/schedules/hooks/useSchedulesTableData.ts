import { useMemo } from 'react';
import { chain, get } from 'lodash';
import formatServerTime from '@/lib/date-time';
import useSchedules from './useSchedules';
import useSections from '../../sections/hooks/useSections';
import { Weekdays } from '../types';
import useRoutesLookup from '../../routes/hooks/useRoutesLookup';

export type ScheduleTableRecord = {
  id: string;
  weekday: string;
  isDefault: boolean;
  startTime: string | null;
  endTime: string | null;
  route: string;
};

function useSchedulesTableData(sectionName: string) {
  const { data: schedules, error } = useSchedules();
  const { data: sections } = useSections();
  const routesLookup = useRoutesLookup();

  const sectionId = useMemo(
    () =>
      sections?.find((section) => section.section === sectionName)?.section_id,
    [sectionName, sections]
  );

  const data: ScheduleTableRecord[] = useMemo(() => {
    if (!sectionId || !schedules || !routesLookup) return [];

    return chain(schedules)
      .filter((schedule) => schedule.section === sectionId)
      .orderBy(['week_day', 'is_default'], 'asc')
      .map((schedule) => ({
        id: schedule.schedule_id,
        weekday: Weekdays[schedule.week_day],
        isDefault: schedule.is_default,
        startTime: schedule.is_default
          ? 'Default'
          : formatServerTime(schedule.start_time as string),
        endTime: schedule.is_default
          ? 'Default'
          : formatServerTime(schedule.end_time as string),
        route: get(routesLookup[schedule.route], 'route_name'),
      }))
      .value();
  }, [schedules, sectionId, routesLookup]);

  return { data, isLoading: !sectionId || !schedules || !routesLookup, error };
}

export default useSchedulesTableData;
