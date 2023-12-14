import { z } from 'zod';

export const optionalMessageSchema = z
  .any()
  .transform((val) => (val ? parseInt(val, 10) : null));

const schema = z.object({
  prompt_name: z.string().min(1, 'Name is required').max(50).trim(),
});

export const messageUploadSchema = z.object({
  files: z
    .object({
      file: z.any(),
      name: z.string().min(1, 'A filename is required').max(20),
    })
    .array()
    .min(1, 'At least one prompt is required.'),
});

export type FormValues = z.infer<typeof schema>;
export type UploadFormValues = z.infer<typeof messageUploadSchema>;

export default schema;
