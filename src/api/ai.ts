import { GenerateWorkoutDto, CreateWorkoutBulkDto } from '@/types/api';
import apiClient from '@/api/client';

export async function generateWorkout(data: GenerateWorkoutDto): Promise<CreateWorkoutBulkDto> {
  const { data: result } = await apiClient.post('/ai/generate-workout', data);
  return result;
}
