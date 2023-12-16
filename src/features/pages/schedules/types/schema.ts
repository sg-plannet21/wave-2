import { z } from 'zod';
import { optionalMessageSchema } from '../../messages/types/schema';
import { Schedule } from '.';

export const baseSchema = z.object({
  message_1: optionalMessageSchema,
  message_2: optionalMessageSchema,
  message_3: optionalMessageSchema,
  message_4: optionalMessageSchema,
  message_5: optionalMessageSchema,
  route: z.string().min(1, 'Route is required'),
});

export const newSchema = z
  .object({
    timeRange: z.array(z.string()),
    weekDays: z.array(z.number()).min(1, 'At least one weekday is required'),
  })
  .merge(baseSchema);

export const customSchema = z
  .object({
    timeRange: z.array(z.string()),
  })
  .merge(baseSchema);

export type NewFormValues = z.infer<typeof newSchema>;
export type CustomFormValues = z.infer<typeof customSchema>;

export type FormValues = z.infer<typeof baseSchema> &
  Pick<Schedule, 'start_time' | 'end_time' | 'week_day' | 'section'>;
