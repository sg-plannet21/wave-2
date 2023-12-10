import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utc);

function formatServerTime(time: string) {
  return dayjs.utc(time, 'HH:mm').local().format('HH:mm');
}

export default formatServerTime;
