import { useMemo } from 'react';
import { get, orderBy } from 'lodash';
import { formatServerTime, isActiveTimeRange } from '@/lib/date-time';
import useSchedules from './useSchedules';
import { Schedule, Weekdays } from '../types';
import useRoutesLookup from '../../routes/hooks/useRoutesLookup';

type ActiveSectionSchedule = { [sectionId: Schedule['section']]: string };

export type ScheduleTableRecord = {
  id: string;
  section: string;
  weekday: string;
  isDefault: boolean;
  startTime: string | null;
  endTime: string | null;
  route: string;
  isActive: boolean;
};

function useSchedulesTableData() {
  const { data: schedules, error } = useSchedules();
  const routesLookup = useRoutesLookup();

  const mapped: ScheduleTableRecord[] = useMemo(() => {
    if (!schedules || !routesLookup) return [];

    const day = new Date().getDay();
    const currentDay = day === 0 ? 7 : day;

    const ordered = orderBy(
      schedules,
      ['week_day', 'is_default', 'start_time'],
      'asc'
    );

    const activeSectionSchedules: ActiveSectionSchedule = {};
    for (let i = 0; i < ordered.length; i++) {
      const currentSchedule = ordered[i];
      if (currentSchedule.week_day === currentDay) {
        if (currentSchedule.is_default) {
          if (!activeSectionSchedules[currentSchedule.section])
            activeSectionSchedules[currentSchedule.section] =
              currentSchedule.schedule_id;
        } else if (
          isActiveTimeRange(
            currentSchedule.start_time as string,
            currentSchedule.end_time as string
          )
        ) {
          activeSectionSchedules[currentSchedule.section] =
            currentSchedule.schedule_id;
        }
      }
    }

    const tableRecords: Array<ScheduleTableRecord> = [];
    for (let i = 0; i < ordered.length; i++) {
      tableRecords.push({
        id: ordered[i].schedule_id,
        section: ordered[i].section,
        weekday: Weekdays[ordered[i].week_day],
        isDefault: ordered[i].is_default,
        startTime: ordered[i].is_default
          ? 'Default'
          : formatServerTime(ordered[i].start_time as string),
        endTime: ordered[i].is_default
          ? 'Default'
          : formatServerTime(ordered[i].end_time as string),
        route: get(routesLookup[ordered[i].route], 'route_name'),
        isActive:
          activeSectionSchedules[ordered[i].section] === ordered[i].schedule_id,
      });
    }

    return tableRecords;
  }, [schedules, routesLookup]);

  return {
    data: mapped,
    isLoading: !schedules || !routesLookup,
    error,
  };
}

export default useSchedulesTableData;
