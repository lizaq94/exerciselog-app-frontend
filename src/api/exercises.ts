import { CreateExerciseDto, Exercise, UpdateExerciseDto, UploadFile } from '@/types/api';
import apiClient from '@/api/client';

export async function getWorkoutExercises(workoutId: string): Promise<Exercise[]> {
  const { data } = await apiClient.get(`/workouts/${workoutId}/exercises`);
  return data;
}

export async function getExercise(exerciseId: string): Promise<Exercise> {
  const { data } = await apiClient.get(`/exercises/${exerciseId}`);
  return data;
}

export async function createExercise(
  workoutId: string,
  createExerciseDto: CreateExerciseDto,
): Promise<Exercise> {
  const { data } = await apiClient.post(`/workouts/${workoutId}/exercises`, createExerciseDto);
  return data;
}

export async function updateExercise(
  exerciseId: string,
  updateExerciseDto: UpdateExerciseDto,
): Promise<Exercise> {
  const { data } = await apiClient.patch(`/exercises/${exerciseId}`, updateExerciseDto);
  return data;
}

export async function deleteExercise(exerciseId: string): Promise<void> {
  await apiClient.delete(`/exercises/${exerciseId}`);
}

export async function uploadExerciseImage(exerciseId: string, file: File): Promise<UploadFile> {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await apiClient.post(`/exercises/${exerciseId}/image`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
