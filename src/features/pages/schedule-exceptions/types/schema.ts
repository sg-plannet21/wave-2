import { z } from 'zod';

const schema = z.object({
  description: z.string().min(1, 'Name is required').max(50).trim(),
});

export type FormValues = z.infer<typeof schema>;

export default schema;
