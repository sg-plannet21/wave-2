import dayjs from 'dayjs';

// plugins
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(utc);

function utcDateFromTime(utcTime: string): dayjs.Dayjs {
  return dayjs.utc(utcTime, 'HH:mm');
}

export function formatServerTime(utcTime: string) {
  return utcDateFromTime(utcTime).local().format('HH:mm');
}

export function isActiveTimeRange(start: string, end: string): boolean {
  const startTime = utcDateFromTime(start);
  const endTime = utcDateFromTime(end);
  return dayjs().isBetween(startTime, endTime);
}
