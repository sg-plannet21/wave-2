import { z } from 'zod';

const schema = z.object({
  entry_point: z.string().min(1, 'Name is required').max(50).trim(),
  region: z.coerce.number(),
});

export type FormValues = z.infer<typeof schema>;

export default schema;
