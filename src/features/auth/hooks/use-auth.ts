import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe, login, logout, signup } from '../api';

export const authKeys = {
  all: ['user'] as const,
  me: ['user', 'me'] as const,
};

const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: getMe,
  });
};

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => queryClient.setQueryData(authKeys.me, data),
  });
};

const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => queryClient.setQueryData(authKeys.me, data),
  });
};

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.clear(),
  });
};

export { useCurrentUser, useLogin, useSignUp };
