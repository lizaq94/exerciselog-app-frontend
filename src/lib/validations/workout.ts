import { z } from 'zod';

export const createWorkoutSchema = z.object({
  name: z.string().min(1, 'Workout name is required').max(100, 'Workout name is too long'),
  notes: z.string().max(500, 'Notes are too long').optional(),
  duration: z.number().positive('Duration must be positive').optional(),
});

export const updateWorkoutSchema = createWorkoutSchema.partial();
