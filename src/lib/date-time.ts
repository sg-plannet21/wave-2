import dayjs from 'dayjs';

// plugins
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Schedule, Weekdays } from '@/features/pages/schedules/types';
import { ScheduleException } from '@/features/pages/schedule-exceptions/types';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(relativeTime);

const timeFormat = 'HH:mm';
const dateFormat = 'D/M/YY hh:mm a';

export interface TimeDifferenceReturn {
  status: 'ACTIVE' | 'EXPIRED' | 'UPCOMING';
  label: string;
}
export function timeDifferenceLabel(
  start: dayjs.Dayjs,
  end: dayjs.Dayjs
): TimeDifferenceReturn {
  const now = dayjs();
  if (now.isBefore(start)) {
    return {
      status: 'UPCOMING',
      label: start.fromNow(),
    };
  }
  if (now.isBefore(end)) {
    return {
      status: 'ACTIVE',
      label: `Ends ${end.fromNow()}`,
    };
  }
  return {
    status: 'EXPIRED',
    label: end.fromNow(),
  };
}

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

export function validateException(
  exceptions: ScheduleException[],
  start: string,
  end: string
) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);

  if (endDate.isSame(startDate) || endDate.isBefore(startDate)) {
    return {
      success: false,
      message: 'End Date must be later than start date',
    };
  }

  for (let i = 0; i < exceptions.length; i++) {
    const existingStart = dayjs(exceptions[i].start_time);
    const existingEnd = dayjs(exceptions[i].end_time);

    if (
      existingStart.isBetween(startDate, endDate) ||
      existingEnd.isBetween(startDate, endDate) ||
      (startDate.isBetween(existingStart, existingEnd, 'ms', '[]') &&
        endDate.isBetween(existingStart, existingEnd, 'ms', '[]'))
    ) {
      return {
        success: false,
        message: `Clashes with ${
          exceptions[i].description
        }: ${existingStart.format(dateFormat)} - ${existingEnd.format(
          dateFormat
        )}`,
      };
    }
  }

  return { success: true };
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
      message: 'End time must be later than start time',
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

      if (
        scheduleStartTime.isBetween(newStartTime, newEndTime) ||
        scheduleEndTime.isBetween(newStartTime, newEndTime) ||
        (newStartTime.isBetween(
          scheduleStartTime,
          scheduleEndTime,
          'ms',
          '[]'
        ) &&
          newEndTime.isBetween(scheduleStartTime, scheduleEndTime, 'ms', '[]'))
      ) {
        errors.push(
          `Clashes with ${
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
