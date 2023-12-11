import { useMemo } from 'react';
import { chain, get } from 'lodash';
import { formatServerTime, isActiveTimeRange } from '@/lib/date-time';
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
  isActive: boolean;
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

    const sectionSchedules = chain(schedules)
      .filter((schedule) => schedule.section === sectionId)
      .orderBy(['week_day', 'is_default', 'start_time'], 'asc')
      .value();

    const currentDay = new Date().getDay() + 1;
    const daySchedules = sectionSchedules.filter(
      (schedule) => schedule.week_day === currentDay
    );

    let activeScheduleId: string | undefined;

    for (let i = 0; i < daySchedules.length; i++) {
      const currentSchedule = daySchedules[i];
      if (currentSchedule.is_default) {
        if (!activeScheduleId) {
          activeScheduleId = currentSchedule.schedule_id;
        }
      } else if (
        isActiveTimeRange(
          currentSchedule.start_time as string,
          currentSchedule.end_time as string
        )
      ) {
        activeScheduleId = currentSchedule.schedule_id;
        break;
      }
    }

    return sectionSchedules.map((schedule) => ({
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
      isActive: schedule.schedule_id === activeScheduleId,
    }));
  }, [schedules, sectionId, routesLookup]);

  return { data, isLoading: !sectionId || !schedules || !routesLookup, error };
}

export default useSchedulesTableData;
