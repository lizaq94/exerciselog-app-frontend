import {
  CreateWorkoutBulkDto,
  CreateWorkoutDto,
  PaginatedResponse,
  UpdateWorkoutDto,
  Workout,
} from '@/types/api';
import apiClient from '@/api/client';

export async function getUserWorkouts(
  userId: string,
  params?: { page?: number; limit?: number },
): Promise<PaginatedResponse<Workout>> {
  const { data } = await apiClient.get(`/users/${userId}/workouts`, { params });
  return data;
}

export async function getWorkout(id: string): Promise<Workout> {
  const { data } = await apiClient.get(`/workouts/${id}`);
  return data;
}

export async function createWorkout(
  userId: string,
  createWorkoutDto: CreateWorkoutDto,
): Promise<Workout> {
  const { data } = await apiClient.post(`/users/${userId}/workouts`, createWorkoutDto);
  return data;
}

export async function createWorkoutBulk(
  userId: string,
  createWorkoutBulkDto: CreateWorkoutBulkDto,
): Promise<Workout> {
  const { data } = await apiClient.post(`/users/${userId}/workouts/bulk`, createWorkoutBulkDto);
  return data;
}

export async function updateWorkout(
  id: string,
  updateWorkoutDto: UpdateWorkoutDto,
): Promise<Workout> {
  const { data } = await apiClient.patch(`/workouts/${id}`, updateWorkoutDto);
  return data;
}

export async function deleteWorkout(id: string): Promise<void> {
  await apiClient.delete(`/workouts/${id}`);
}
