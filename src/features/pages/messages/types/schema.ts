import { z } from 'zod';

export const optionalMessageSchema = z.coerce
  .string()
  .nullable()
  .transform((val) => (val && parseInt(val, 10)) ?? null);

const schema = z.object({
  prompt_name: z.string().min(1, 'Name is required').max(50).trim(),
});

export type FormValues = z.infer<typeof schema>;

export default schema;
