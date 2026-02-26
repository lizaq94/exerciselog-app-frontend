import { z } from 'zod';

export const createExerciseSchema = z.object({
  name: z.string().min(1, 'Exercise name is required').max(100, 'Exercise name is too long'),
  order: z.number().int().positive('Order must be positive'),
  type: z.string().min(1, 'Exercise type is required').max(100, 'Exercise type is too long'),
  notes: z.string().max(500, 'Notes are too long').optional(),
});

export const updateExerciseSchema = createExerciseSchema.partial();
