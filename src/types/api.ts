export interface User {
  id: string;
  username: string;
  email: string;
  workouts?: Workout[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Workout {
  id: string;
  name: string;
  date: Date;
  notes: string;
  duration: number;
  exercises?: Exercise[];
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  order: number;
  type: string;
  notes: string;
  sets?: Set[];
  workoutId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Set {
  id: string;
  repetitions: number;
  weight: number;
  order: number;
  durationInSeconds: number | null;
  restAfterSetInSeconds: number | null;
  exerciseId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadFile {
  id: string;
  name: string;
  path: string;
  type: 'image';
  mime: string;
  size: number;
  exerciseId: string;
  createDate: Date;
  updateDate: Date;
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

interface CreateWorkoutDto {
  name: string;
  notes?: string;
  duration?: number;
}

interface CreateExerciseDto {
  name: string;
  order: number;
  type: string;
  notes?: string;
}

interface CreateSetDto {
  repetitions: number;
  weight: number;
  order: number;
  durationInSeconds?: number;
  restAfterSetInSeconds?: number;
}

type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

interface GenerateWorkoutDto {
  goal: string;
  experienceLevel: ExperienceLevel;
  daysPerWeek: number;
  durationInMinutes: number;
  availableEquipment?: string;
}

interface CreateSetBulkDto {
  order: number;
  repetitions: number;
  weight: number;
  durationInSeconds?: number;
  restAfterSetInSeconds?: number;
}

interface CreateExerciseBulkDto {
  order: number;
  name: string;
  type: string;
  notes: string;
  sets: CreateSetBulkDto[];
}

interface CreateWorkoutBulkDto {
  name: string;
  notes?: string;
  duration?: number;
  exercises: CreateExerciseBulkDto[];
}

type UpdateWorkoutDto = Partial<CreateWorkoutDto>;

type UpdateExerciseDto = Partial<CreateExerciseDto>;

type UpdateSetDto = Partial<CreateSetDto>;
