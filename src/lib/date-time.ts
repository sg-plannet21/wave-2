import dayjs from 'dayjs';

// plugins
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Schedule, Weekdays } from '@/features/pages/schedules/types';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(utc);

const timeFormat = 'HH:mm';

function utcDateFromTime(utcTime: string): dayjs.Dayjs {
  return dayjs(utcTime, timeFormat).utc(true);
}

export function formatServerTime(utcTime: string): string {
  return utcDateFromTime(utcTime).local().format(timeFormat);
}

export function utcFormat(localTime: string): string {
  return dayjs(localTime, timeFormat).utc().format(timeFormat);
}

export function isActiveTimeRange(start: string, end: string): boolean {
  const startTime = utcDateFromTime(start);
  const endTime = utcDateFromTime(end);
  return dayjs().isBetween(startTime, endTime);
}

interface SuccessResponse {
  success: true;
}

interface FailureResponse {
  success: false;
  message: string;
}

export interface NewScheduleData {
  startTime: string;
  endTime: string;
  day: number;
  id?: string;
}

export function validateSchedule(
  schedules: Schedule[],
  newSchedule: NewScheduleData
): SuccessResponse | FailureResponse {
  const { id, day, endTime, startTime } = newSchedule;
  const newStartTime = dayjs(startTime, timeFormat);
  const newEndTime = dayjs(endTime, timeFormat);

  if (newEndTime.isSame(newStartTime) || newEndTime.isBefore(newStartTime)) {
    return {
      success: false,
      message: 'End Date must be later than start date',
    };
  }

  const errors: Array<string> = [];
  for (let i = 0; i < schedules.length; i++) {
    const schedule = schedules[i];
    if (
      !schedule.is_default &&
      schedule.week_day === day &&
      schedule.schedule_id !== id
    ) {
      const scheduleStartTime = utcDateFromTime(schedule.start_time as string);
      const scheduleEndTime = utcDateFromTime(schedule.end_time as string);

      // Encloses existing schedule start/end
      if (
        scheduleStartTime.isBetween(newStartTime, newEndTime) ||
        scheduleEndTime.isBetween(newStartTime, newEndTime)
      ) {
        errors.push(
          `Clashes with ${
            Weekdays[schedule.week_day]
          }: ${scheduleStartTime.format(timeFormat)} - ${scheduleEndTime.format(
            timeFormat
          )}`
        );
      } else if (
        newStartTime.isBetween(
          scheduleStartTime,
          scheduleEndTime,
          'ms',
          '[]'
        ) &&
        newEndTime.isBetween(scheduleStartTime, scheduleEndTime, 'ms', '[]')
      ) {
        errors.push(
          `Clashed with ${
            Weekdays[schedule.week_day]
          }: ${scheduleStartTime.format(timeFormat)} - ${scheduleEndTime.format(
            timeFormat
          )}`
        );
      }
    }
  }
  if (errors.length) return { success: false, message: errors.join(', ') };

  return { success: true };
}
