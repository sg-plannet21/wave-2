import dayjs from 'dayjs';

// plugins
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';

dayjs.extend(isBetween);
dayjs.extend(utc);

export default dayjs;
