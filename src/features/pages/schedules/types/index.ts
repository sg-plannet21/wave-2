export type Schedule = {
  url: string;
  schedule_id: string;
  week_day: number;
  is_default: boolean;
  start_time: string | null;
  end_time: string | null;
  business_unit: string;
  section: string;
  route: string;
  message_1: number | null;
  message_2: number | null;
  message_3: number | null;
  message_4: number | null;
  message_5: number | null;
};

export enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}
