import apiClient from '@/api/client';
import { LoginCredentials, SignupCredentials, User } from '@/types/api';

export async function login(credentials: LoginCredentials): Promise<User> {
  const { data } = await apiClient.post<User>('/auth/login', credentials);
  return data;
}

export async function signup(credentials: SignupCredentials): Promise<User> {
  const { data } = await apiClient.post<User>('/auth/signup', credentials);
  return data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}

export async function getMe(): Promise<User> {
  const { data } = await apiClient.get<User>('/users/me');
  return data;
}
