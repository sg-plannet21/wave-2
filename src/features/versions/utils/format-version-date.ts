import dayjs from 'dayjs';

const dateFormat = 'ddd D MMM h:mm:ss a';

function formatVersionDate(date: string): string {
  return dayjs(date).format(dateFormat);
}

export default formatVersionDate;
