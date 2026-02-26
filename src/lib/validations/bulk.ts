import { z } from 'zod';

export const createSetBulkSchema = z.object({
  order: z.number().int().nonnegative('Order must be 0 or greater'),
  repetitions: z.number().int().positive('Repetitions must be positive'),
  weight: z.number().nonnegative('Weight must be 0 or greater'),
  durationInSeconds: z.number().int().positive('Duration must be positive').optional(),
  restAfterSetInSeconds: z.number().int().positive('Rest time must be positive').optional(),
});

export const createExerciseBulkSchema = z.object({
  order: z.number().int().nonnegative('Order must be 0 or greater'),
  name: z.string().min(1, 'Exercise name is required').max(100, 'Exercise name is too long'),
  type: z.string().min(1, 'Exercise type is required').max(100, 'Exercise type is too long'),
  notes: z.string().max(500, 'Notes are too long'),
  sets: z.array(createSetBulkSchema),
});

export const createWorkoutBulkSchema = z.object({
  name: z.string().min(1, 'Workout name is required').max(100, 'Workout name is too long'),
  notes: z.string().max(500, 'Notes are too long').optional(),
  duration: z.number().positive('Duration must be positive').optional(),
  exercises: z.array(createExerciseBulkSchema),
});
