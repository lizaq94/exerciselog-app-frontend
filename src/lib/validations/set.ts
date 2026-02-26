import { z } from 'zod';

export const createSetSchema = z.object({
  repetitions: z.number().int().positive('Repetitions must be positive'),
  weight: z.number().positive('Weight must be positive'),
  order: z.number().int().positive('Order must be positive'),
  durationInSeconds: z.number().positive('Duration must be positive').optional(),
  restAfterSetInSeconds: z.number().positive('Rest time must be positive').optional(),
});

export const updateSetSchema = createSetSchema.partial();
