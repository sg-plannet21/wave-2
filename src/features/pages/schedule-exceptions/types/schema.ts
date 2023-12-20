import { z } from 'zod';
import { optionalMessageSchema } from '../../messages/types/schema';

const schema = z.object({
  dateRange: z.array(z.date()),
  description: z.string().min(1, 'Name is required').max(50).trim(),
  message_1: optionalMessageSchema,
  message_2: optionalMessageSchema,
  message_3: optionalMessageSchema,
  message_4: optionalMessageSchema,
  message_5: optionalMessageSchema,
  route: z.string().min(1, 'Route is required'),
});

export type FormValues = z.infer<typeof schema>;

export default schema;
