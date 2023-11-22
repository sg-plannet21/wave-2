import { z } from 'zod';

const schema = z.object({
  business_unit: z
    .string()
    .min(1, 'Name is required')
    .max(50)
    .transform((val) => val.trim().replace(' ', '_')),
  default_region: z.coerce.number(),
});

export type FormValues = z.infer<typeof schema>;

export default schema;
