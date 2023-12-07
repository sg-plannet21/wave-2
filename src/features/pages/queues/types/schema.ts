import { z } from 'zod';
import { optionalMessageSchema } from '../../messages/types/schema';

function isNumeric(value: string): boolean {
  return /^-?\d+$/.test(value);
}

const routeSchema = z.string().nullable().default(null);

const thresholdToggles: {
  toggle: keyof FormValues;
  threshold: keyof FormValues;
  route: keyof FormValues;
}[] = [
  {
    toggle: 'max_queue_calls_toggle',
    threshold: 'max_queue_calls_threshold',
    route: 'max_queue_calls_route',
  },
  {
    toggle: 'max_queue_time_toggle',
    threshold: 'max_queue_time_threshold',
    route: 'max_queue_time_route',
  },
];

const schema = z
  .object({
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
    max_queue_calls_threshold: z.any(),
    max_queue_calls_message: z.any(),
    max_queue_calls_route: routeSchema,
    max_queue_time_toggle: z.boolean(),
    max_queue_time_threshold: z.any(),
    max_queue_time_message: z.any(),
    max_queue_time_route: routeSchema,
    callback_toggle: z.boolean(),
    callback_calls_threshold: z.any(),
    callback_time_threshold: z.any(),
    callback_route: routeSchema,
  })
  .transform((values) => {
    const formValues = { ...values };

    if (!formValues.closed_toggle) {
      formValues.closed_message = null;
      formValues.closed_route = null;
    }

    if (!formValues.no_agents_toggle) {
      formValues.no_agents_message = null;
      formValues.no_agents_route = null;
    }

    if (!formValues.max_queue_calls_toggle) {
      formValues.max_queue_calls_threshold = null;
      formValues.max_queue_calls_message = null;
      formValues.max_queue_calls_route = null;
    } else {
      const threshold = formValues.max_queue_calls_threshold;
      formValues.max_queue_calls_threshold = isNumeric(threshold)
        ? Number(threshold)
        : null;
    }

    if (!formValues.max_queue_time_toggle) {
      formValues.max_queue_time_threshold = null;
      formValues.max_queue_time_route = null;
    } else {
      const threshold = formValues.max_queue_time_threshold;
      formValues.max_queue_time_threshold = isNumeric(threshold)
        ? Number(threshold)
        : null;
    }

    if (!formValues.callback_toggle) {
      formValues.callback_time_threshold = null;
      formValues.callback_calls_threshold = null;
      formValues.callback_route = null;
    } else {
      const timeThreshold = formValues.callback_time_threshold;
      formValues.callback_time_threshold = isNumeric(timeThreshold)
        ? Number(timeThreshold)
        : null;

      const callsThreshold = formValues.callback_calls_threshold;
      formValues.callback_calls_threshold = isNumeric(callsThreshold)
        ? Number(callsThreshold)
        : null;
    }

    return formValues;
  })
  .superRefine((formValues, ctx) => {
    // closed toggle
    if (formValues.closed_toggle && !formValues.closed_route) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required when toggle is enabled',
        path: ['closed_route'],
      });
    }

    // no agents toggle
    if (formValues.no_agents_toggle && !formValues.no_agents_route) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Required when toggle is enabled',
        path: ['no_agents_route'],
      });
    }

    thresholdToggles.forEach((fieldSet) => {
      // max queue calls toggle
      if (formValues[fieldSet.toggle]) {
        // max queue calls threshold (number)
        if (typeof formValues[fieldSet.threshold] !== 'number') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Threshold number is required',
            path: [fieldSet.threshold],
          });
        }

        // max queue calls route
        if (!formValues[fieldSet.route]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required when toggle is enabled',
            path: [fieldSet.route],
          });
        }
      }
    });

    if (formValues.callback_toggle) {
      // callback calls threshold or callback time threshold must be populated
      if (
        typeof formValues.callback_calls_threshold !== 'number' &&
        typeof formValues.callback_time_threshold !== 'number'
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one threshold field is required',
          path: ['callback_calls_threshold'],
        });
      }

      // callback Route
      if (!formValues.callback_route) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required when toggle is enabled',
          path: ['callback_route'],
        });
      }
    }
  });

export type FormValues = z.infer<typeof schema>;

export default schema;
