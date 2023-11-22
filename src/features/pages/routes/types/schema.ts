import { z } from 'zod';

function routeSchema(externalDestinationTypeId: string | undefined) {
  return z
    .object({
      route_name: z.string().min(1, 'Name is required').max(50).trim(),
      destination: z.string().min(1, 'Destination is required').max(50).trim(),
      destination_type: z
        .string()
        .min(1, 'Destination Type is required')
        .max(50)
        .trim(),
    })
    .refine(
      (val) =>
        val.destination_type === externalDestinationTypeId
          ? /^\d+$/.test(val.destination)
          : true,
      {
        message: 'A number is required when the Destination Type is External',
        path: ['destination'],
      }
    );
}
export type FormValues = z.infer<ReturnType<typeof routeSchema>>;

export default routeSchema;
