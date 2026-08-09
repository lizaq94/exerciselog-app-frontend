import apiClient from '@/api/client';
import { LoginCredentials, SignupCredentials, UserIdentity } from '@/types/api';

export async function login(credentials: LoginCredentials): Promise<UserIdentity> {
  const { data } = await apiClient.post<UserIdentity>('/auth/login', credentials);
  return data;
}

export async function signup(credentials: SignupCredentials): Promise<UserIdentity> {
  const { data } = await apiClient.post<UserIdentity>('/auth/signup', credentials);
  return data;
}

export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}

export async function getMe(): Promise<UserIdentity> {
  const { data } = await apiClient.get<UserIdentity>('/users/me');
  return data;
}
