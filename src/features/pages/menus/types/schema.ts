import { z } from 'zod';

export const menuOptions = [
  { prefix: 'no_input', label: 'No Input' },
  { prefix: 'no_match', label: 'No Match' },
  { prefix: 'opt0', label: 'Option 0' },
  { prefix: 'opt1', label: 'Option 1' },
  { prefix: 'opt2', label: 'Option 2' },
  { prefix: 'opt3', label: 'Option 3' },
  { prefix: 'opt4', label: 'Option 4' },
  { prefix: 'opt5', label: 'Option 5' },
  { prefix: 'opt6', label: 'Option 6' },
  { prefix: 'opt7', label: 'Option 7' },
  { prefix: 'opt8', label: 'Option 8' },
  { prefix: 'opt9', label: 'Option 9' },
  { prefix: 'asterisk', label: 'Option *' },
  { prefix: 'hash', label: 'Option #' },
];

const messageSchema = z.coerce
  .string()
  .nullable()
  .transform((val) => (val && parseInt(val, 10)) ?? null);
const routeSchema = z.string().nullable().default(null);

const schema = z
  .object({
    menu_name: z.string().min(1, ' Menu name is required'),
    max_retries: z.coerce.number().min(1, 'Max Retries is required'),
    menu_message: z.coerce.number().min(1, 'Menu Message is required'),
    opt0_message: messageSchema,
    opt0_route: routeSchema,
    opt1_message: messageSchema,
    opt1_route: routeSchema,
    opt2_message: messageSchema,
    opt2_route: routeSchema,
    opt3_message: messageSchema,
    opt3_route: routeSchema,
    opt4_message: messageSchema,
    opt4_route: routeSchema,
    opt5_message: messageSchema,
    opt5_route: routeSchema,
    opt6_message: messageSchema,
    opt6_route: routeSchema,
    opt7_message: messageSchema,
    opt7_route: routeSchema,
    opt8_message: messageSchema,
    opt8_route: routeSchema,
    opt9_message: messageSchema,
    opt9_route: routeSchema,
    no_input_message: messageSchema,
    no_input_route: z.string().min(1, 'No Input Route is a required field'),
    no_match_message: messageSchema,
    no_match_route: z.string().min(1, 'No Match Route is a required field'),
    asterisk_message: messageSchema,
    asterisk_route: routeSchema,
    hash_message: messageSchema,
    hash_route: routeSchema,
  })
  .superRefine((val, ctx) => {
    menuOptions.forEach(({ prefix }) => {
      const messageField = `${prefix}_message`;
      const routeField = `${prefix}_route`;

      if (
        val[messageField as keyof typeof val] &&
        !val[routeField as keyof typeof val]
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Route is required when a corresponding message is provided',
          path: [routeField],
        });
      }
    });

    if (
      !val.opt0_route &&
      !val.opt1_route &&
      !val.opt2_route &&
      !val.opt3_route &&
      !val.opt4_route &&
      !val.opt5_route &&
      !val.opt6_route &&
      !val.opt7_route &&
      !val.opt8_route &&
      !val.opt9_route &&
      !val.asterisk_route &&
      !val.hash_route
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one Option (0-9, * or #) is required',
        path: ['opt1_route'],
      });
    }
  });

export type FormValues = z.infer<typeof schema>;

export default schema;
