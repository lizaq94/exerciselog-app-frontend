export interface User {
  id: string;
  username: string;
  email: string;
  workouts?: Workout[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  username: string;
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  notes: string;
  duration: number;
  exercises?: Exercise[];
  userId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  order: number;
  type: string;
  notes: string;
  sets?: Set[];
  workoutId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Set {
  id: string;
  repetitions: number;
  weight: number;
  order: number;
  durationInSeconds: number | null;
  restAfterSetInSeconds: number | null;
  exerciseId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UploadFile {
  id: string;
  name: string;
  path: string;
  type: 'image';
  mime: string;
  size: number;
  exerciseId: string;
  createDate: string;
  updateDate: string;
}

export interface PaginationMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
}

export interface PaginationLinks {
  first: string | null;
  previous: string | null;
  current: string | null;
  next: string | null;
  last: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}

export interface ApiResponse<T> {
  apiVersion: string;
  data: T;
}

export interface CreateWorkoutDto {
  name: string;
  notes?: string;
  duration?: number;
}

export interface CreateExerciseDto {
  name: string;
  order: number;
  type: string;
  notes?: string;
}

export interface CreateSetDto {
  repetitions: number;
  weight: number;
  order: number;
  durationInSeconds?: number;
  restAfterSetInSeconds?: number;
}

export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface GenerateWorkoutDto {
  goal: string;
  experienceLevel: ExperienceLevel;
  daysPerWeek: number;
  durationInMinutes: number;
  availableEquipment?: string;
}

export interface CreateSetBulkDto {
  order: number;
  repetitions: number;
  weight: number;
  durationInSeconds?: number;
  restAfterSetInSeconds?: number;
}

export interface CreateExerciseBulkDto {
  order: number;
  name: string;
  type: string;
  notes: string;
  sets: CreateSetBulkDto[];
}

export interface CreateWorkoutBulkDto {
  name: string;
  notes?: string;
  duration?: number;
  exercises: CreateExerciseBulkDto[];
}

export type UpdateWorkoutDto = Partial<CreateWorkoutDto>;

export type UpdateExerciseDto = Partial<CreateExerciseDto>;

export type UpdateSetDto = Partial<CreateSetDto>;
