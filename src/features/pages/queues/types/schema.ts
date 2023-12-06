import { z } from 'zod';
import { optionalMessageSchema } from '../../messages/types/schema';

const routeSchema = z.string().nullable().default(null);

const schema = z.object({
  queue_priority: z.coerce.number(),
  queue_message_1: optionalMessageSchema,
  queue_message_2: optionalMessageSchema,
  queue_message_3: optionalMessageSchema,
  queue_message_4: optionalMessageSchema,
  queue_message_5: optionalMessageSchema,
  queue_music: z.coerce.number().min(1, 'Menu Message is required'),
  whisper_message: optionalMessageSchema,
  queue_welcome: optionalMessageSchema,
  closed_toggle: z.boolean(),
  closed_message: optionalMessageSchema,
  closed_route: routeSchema,
  no_agents_toggle: z.boolean(),
  no_agents_message: optionalMessageSchema,
  no_agents_route: routeSchema,
  max_queue_calls_toggle: z.boolean(),
  max_queue_calls_threshold: z.number().min(0).max(1000).nullable(),
  max_queue_calls_message: optionalMessageSchema,
  max_queue_calls_route: routeSchema,
  max_queue_time_toggle: z.boolean(),
  max_queue_time_threshold: z
    .number()
    .min(0)
    .max(60 * 60 * 1)
    .nullable(),
  max_queue_time_message: optionalMessageSchema,
  max_queue_time_route: routeSchema,
  callback_toggle: z.boolean(),
  callback_calls_threshold: z.number().min(0).max(100).nullable(),
  callback_time_threshold: z
    .number()
    .min(0)
    .max(60 * 60 * 1)
    .nullable(),
  callback_route: routeSchema,
});

export type FormValues = z.infer<typeof schema>;

export default schema;
