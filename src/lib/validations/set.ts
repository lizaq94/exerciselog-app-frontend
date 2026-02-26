import { z } from 'zod';

export const createSetSchema = z.object({
  repetitions: z.number().int().positive('Repetitions must be positive'),
  weight: z.number().nonnegative('Weight must be 0 or greater'),
  order: z.number().int().nonnegative('Order must be 0 or greater'),
  durationInSeconds: z.number().int().positive('Duration must be positive').optional(),
  restAfterSetInSeconds: z.number().int().positive('Rest time must be positive').optional(),
});

export const updateSetSchema = createSetSchema.partial();
