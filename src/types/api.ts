export type User = {
  id: string;
  username: string;
  email: string;
  workouts?: Workout[];
  createdAt: Date;
  updatedAt: Date;
};

export type Workout = {
  id: string;
  name: string;
  date: Date;
  notes: string;
  duration: number;
  exercises?: Exercise[];
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Exercise = {
  id: string;
  name: string;
  order: number;
  type: string;
  notes: string;
  sets?: Set[];
  workoutId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Set = {
  id: string;
  repetitions: number;
  weight: number;
  order: number;
  durationInSeconds: number | null;
  restAfterSetInSeconds: number | null;
  exerciseId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type UploadFile = {
  id: string;
  name: string;
  path: string;
  type: 'image';
  mime: string;
  size: number;
  exerciseId: string;
  createDate: Date;
  updateDate: Date;
};
