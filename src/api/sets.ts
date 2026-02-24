import { CreateSetDto, Set, UpdateSetDto } from '@/types/api';
import apiClient from '@/api/client';

export async function getExerciseSets(exerciseId: string): Promise<Set[]> {
  const { data } = await apiClient.get(`/exercises/${exerciseId}/sets`);
  return data;
}

export async function getSet(setId: string): Promise<Set> {
  const { data } = await apiClient.get(`/sets/${setId}`);
  return data;
}

export async function createSet(exerciseId: string, createSetDto: CreateSetDto): Promise<Set> {
  const { data } = await apiClient.post(`/exercises/${exerciseId}/sets`, createSetDto);
  return data;
}

export async function updateSet(setId: string, updateSetDto: UpdateSetDto): Promise<Set> {
  const { data } = await apiClient.patch(`/sets/${setId}`, updateSetDto);
  return data;
}

export async function deleteSet(setId: string): Promise<void> {
  await apiClient.delete(`/sets/${setId}`);
}
