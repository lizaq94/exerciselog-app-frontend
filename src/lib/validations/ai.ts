import { z } from 'zod';

const experienceLevels = ['beginner', 'intermediate', 'advanced'] as const;

export const generateWorkoutSchema = z.object({
  goal: z.string().min(1, 'Goal is required').max(200, 'Goal is too long'),
  experienceLevel: z.enum(experienceLevels, { message: 'Invalid experience level' }),
  daysPerWeek: z.number().int().min(1, 'At least 1 day').max(7, 'At most 7 days'),
  durationInMinutes: z
    .number()
    .int()
    .min(20, 'At least 20 minutes')
    .max(300, 'At most 300 minutes'),
  availableEquipment: z.string().max(500, 'Equipment description is too long').optional(),
});
