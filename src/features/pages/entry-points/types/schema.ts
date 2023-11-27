import { z } from 'zod';

const schema = z.object({
  entry_point: z.string().min(1, 'Name is required').max(50).trim(),
  region: z.coerce.number(),
  section: z.string().min(1, 'Section is required'),
});

export type FormValues = z.infer<typeof schema>;

export default schema;
